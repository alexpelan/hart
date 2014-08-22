App.Beer = DS.Model.extend({
	//attributes
	timestamp: DS.attr("string"), //using string and parsing is easier than using date because all of the APIs seem to return the date in a different format, so we can't make much use of built in ember serialization
	display_time: DS.attr("string"),
	beer_name: DS.attr("string"),
	beer_style: DS.attr("string"),
	beer_abv: DS.attr("number"),
	beer_image_url: DS.attr("string"),
	brewery_name: DS.attr("string"),
	brewery_location: DS.attr("string"),
	brewery_url: DS.attr("string"),
	


	//relationships
	beers: DS.belongsTo("beers"),

})
