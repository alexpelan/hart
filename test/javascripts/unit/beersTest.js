var store;
var beers;

module("Unit Test: Beers", {

	setup: function(){
		store = App.__container__.lookup("store:main"); //WOOF. But for my purposes, the best way to do this - I don't believe in refactoring properties to a mixin just for the sake of testing. see http://discuss.emberjs.com/t/unit-testing-ember-data-models/3130
		Ember.run(function(){
			beers = store.createRecord("beers", {});	
		});
	},	
		
});

test("parse_date_string returns an object with the different parts of the date accessible", function(){
	var date_string = "Thu, 28 Aug 2014 12:00 +0000";
	var date_object = beers.parse_date_string(date_string);
	
	strictEqual(date_object["day_of_week"], "Thu");
	strictEqual(date_object["month"], "Aug");
	strictEqual(date_object["day"], "28");
	strictEqual(date_object["hour"], "12");
	strictEqual(date_object["minute"], "00");
});

test("massage_timestamp_for_display returns a date string in the appropriate format", function(){
	var date_string = "Thu, 28 Aug 2014 12:00 +0000";
	var output_date = beers.massage_timestamp_for_display(date_string);
	var timezone_adjustment = client_timezone_adjustment();
	var expected_hour = 12 + timezone_adjustment;

	if (expected_hour < 10){
		expected_hour = "0" + expected_hour;
	}

	strictEqual(output_date, "Thu Aug 28 " + expected_hour + "00");
});

test("calculate_time_difference_in_hours returns the correct difference in hours", function(){
	var ms_one = 7200000;
	var ms_two = 3600000;

	var result = beers.calculate_time_difference_in_hours(ms_one, ms_two);

	strictEqual(result, 1);
});

test("bac returns the blood alcohol content of Alex", function(){

	var beer;
	var now_in_utc = new Date();
	var day = now_in_utc.getUTCDate();
	var month = now_in_utc.getUTCMonth();
	var hours = now_in_utc.getUTCHours();
	var minutes = now_in_utc.getUTCMinutes();

	//we're faking the day of week and year since they just get thrown out.
	var month_number_to_name = {
		0: "Jan",
		1: "Feb",
		2: "Mar",
		3: "Apr",
		4: "May",
		5: "Jun",
		6: "Jul",
		7: "Aug",
		8: "Sep",
		9: "Oct",
		10: "Nov",
		11: "Dec",
	};	

	var month = month_number_to_name[month];
	var timestamp = "Fri, " + day + " " + month + " 2014 " + hours + ":" + minutes + ":00";

	Ember.run(function(){
		beer = store.createRecord("beer", {beer_abv: "4.5", timestamp: timestamp});
		beers.get("beer_records").addObject(beer);
	});

	var bac = beers.get("bac");
	strictEqual(bac, 0.02);
	

});

