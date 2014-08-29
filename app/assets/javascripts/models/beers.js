App.Beers = DS.Model.extend(App.SharedModelLogic, App.DateLibrary,{
	beer_records: DS.hasMany("beer"),
	command: DS.belongsTo("command"),

	init: function(){
		this._super();
		this.model_name = "beers";
	},

	get_beers_from_untappd: function(number_of_beers){
		var number_of_beers_string = "?count=" + number_of_beers;
		var request_url = "http://localhost:3000/api/v1/beers.json" + number_of_beers_string;
		return $.getJSON(request_url);
	},

	populate_attributes: function(response){
		beers = response["checkins"]["items"];
		var i;
		for(i=0; i < beers.length; i++){
			var timestamp = beers[i].created_at;
			var display_time = this.massage_timestamp_for_display(timestamp);
			var beer_name = beers[i].beer.beer_name;
			var beer_style = beers[i].beer.beer_style;
			var beer_abv = beers[i].beer.beer_abv;
			var beer_image_url = beers[i].beer.beer_label;
			var brewery_name = beers[i].brewery.brewery_name;
			var brewery_location = beers[i].brewery.location.brewery_city + ", " + beers[i].brewery.location.brewery_state;
			var brewery_url = beers[i].brewery.contact.url;
			var beer = this.store.createRecord("beer", {timestamp: timestamp, beer_name: beer_name, beer_style: beer_style, beer_abv: beer_abv, beer_image_url: beer_image_url, brewery_name: brewery_name, brewery_location: brewery_location, brewery_url: brewery_url, display_time: display_time});
			this.get("beer_records").addObject(beer);
			beer.save();
		}

		this.save();
	},
		
	//Date manipulation fun! lots of it.

	//Let's just match the twitter API: <day of week> <month> <day of month> <24 hour time, no colons>
	massage_timestamp_for_display: function(timestamp){
		var parsed_date = this.parse_date_string(timestamp);
		parsed_date = this.adjust_for_user_timezone(parsed_date); //from App.DateLibrary	

		var massaged_date = parsed_date["day_of_week"] + " " + parsed_date["month"] + " " + parsed_date["day"] + " " + parsed_date["hour"] + parsed_date["minute"];
		return massaged_date;
	},

	parse_date_string: function(date_string){
		parsed_date = {};
		date_tokens = date_string.split(" ");
		parsed_date["day_of_week"] = date_tokens[0].slice(0,3);
		parsed_date["day"] = date_tokens[1];
		parsed_date["month"] = date_tokens[2];
		parsed_date["year"] = date_tokens[3];
		time_tokens = date_tokens[4].split(":");
		parsed_date["hour"] = time_tokens[0];
		parsed_date["minute"] = time_tokens[1];
		parsed_date["second"] = time_tokens[2];
		return parsed_date;
	},

	calculate_time_difference_in_hours: function(later_time, earlier_time){
		var difference_in_ms = later_time - earlier_time;
		var difference_in_s = difference_in_ms / 1000;
		var difference_in_m = difference_in_s / 60;
		var difference_in_h = difference_in_m / 60;
		return difference_in_h;
	},

	//Formula taken from http://www.teamdui.com/bac-widmarks-formula/ - nothing like finding yourself 
	//on a website like "team dui!"
	bac: function(){
		var bac = 0.0;
		var self = this;
		this.get("beer_records").forEach(
			function(beer){
				//first, calculate the "number of drinks" this beer is
				var beer_abv = beer.get("beer_abv");
				//There's no way to differentiate the volume based on untappd data,
				//So we'll overestimate and assume 16 oz
				var number_of_drinks = (beer_abv / 100) * 16; //TODO this line and the next couple: magic numbers!
				var abv_from_drink = number_of_drinks * 5.14 / 170 * .73;
				var time_of_drink = beer.get("timestamp");
				var now_utc_time = new Date().getTime();
				var parsed_date = self.parse_date_string(time_of_drink);
				parsed_date["month"] = self.convert_month_name_to_month_number(parsed_date["month"]);
				var drink_utc_time = new Date(Date.UTC(parsed_date["year"], parsed_date["month"]-1, parsed_date["day"], parsed_date["hour"], parsed_date["minute"], parsed_date["second"]));
				var difference_in_time_in_hours = self.calculate_time_difference_in_hours(now_utc_time, drink_utc_time);
				//we can exit if we exceed 12 hours because the API gives us them in reverse chronological
				if (difference_in_time_in_hours > 12){
					return bac;
				}
				else{
					var abv_absorbed_over_time = .015 * difference_in_time_in_hours;
					var net_abv_from_beer = abv_from_drink - abv_absorbed_over_time;
					if( net_abv_from_beer < 0 ){
						net_abv_from_beer = 0;
					}
					bac = bac + net_abv_from_beer;
				}
			});
		//rounds to two deciml points
		bac = Math.round(bac * 100) / 100;
		return bac;
	}.property("beer_records.@each"),

	
});
