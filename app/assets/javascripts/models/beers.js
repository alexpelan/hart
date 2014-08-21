App.Beers = DS.Model.extend({
	beer_records: DS.hasMany("beer"),
	command: DS.belongsTo("command"),

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
			var beer_name = beers[i].beer.beer_name;
			var beer_style = beers[i].beer.beer_style;
			var beer_abv = beers[i].beer.beer_abv;
			var beer_image_url = beers[i].beer.beer_label;
			var brewery_name = beers[i].brewery.brewery_name;
			var brewery_location = beers[i].brewery.location.brewery_city + ", " + beers[i].brewery.location.brewery_state;
			var brewery_url = beers[i].brewery.contact.url;
			var beer = this.store.createRecord("beer", {timestamp: timestamp, beer_name: beer_name, beer_style: beer_style, beer_abv: beer_abv, beer_image_url: beer_image_url, brewery_name: brewery_name, brewery_location: brewery_location, brewery_url: brewery_url});
			this.get("beer_records").addObject(beer);
			beer.save();
		}

		this.save();
	},
});
