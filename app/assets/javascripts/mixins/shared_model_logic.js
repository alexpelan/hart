App.SharedModelLogic = Ember.Mixin.create({

	model_name: null,

	has_many_relationship_name: function(){

		var model_to_relationship_name_lookup = {
			"beers": "beer_records",
			"books": "book_records",
			"portfolio": "projects",
			"songs": "song_records",
			"tweets": "tweet_records",
		};
		
		return model_to_relationship_name_lookup[this.model_name];

	}.property("model_name"),	

	is_model_populated: function(){
		return (this.get(this.get("has_many_relationship_name") + ".length") > 0);
	}.property("beer_records.length", "book_records.length", "projects.length", "song_records.length", "tweet_records.length"),
	
});
