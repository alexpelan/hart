App.Tweets = DS.Model.extend({

	command: DS.belongsTo("command"),
	tweet_records: DS.hasMany("tweet"),
	
	get_tweets_from_server: function(){
		return $.getJSON("http://localhost:3000/api/v1/tweets.json");
	},

	populate_attributes: function(response){
		tweets = response["alex_pelan"];
		var i
		for (i=0; i<tweets.length; i++){
			var text = tweets[i].text;
			var username = tweets[i].user.screen_name;
			var timestamp = tweets[i].created_at;
			var new_tweet = this.store.createRecord("tweet", {text: text, username: username, timestamp: timestamp});
			this.get("tweet_records").addObject(new_tweet);
			new_tweet.save();
		}

		this.save();

	},
	
	link_to_command: function(command){
		command.set("tweets",this);
	},

})

