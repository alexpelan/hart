App.Tweets = DS.Model.extend(App.DateLibrary,{

	command: DS.belongsTo("command"),
	tweet_records: DS.hasMany("tweet"),
	
	are_tweets_populated: function(){
		return (this.get("tweet_records.length") > 0)
	}.property("tweet_records.length"),

	get_tweets_from_server: function(number_of_tweets){
		var number_of_tweets_string = "?count=" + number_of_tweets;
		var request_url = "http://localhost:3000/api/v1/tweets.json" + number_of_tweets_string; 
		return $.getJSON(request_url);
	},

	populate_attributes: function(response){
		tweets = response["alex_pelan"];
		var i;
		for (i=0; i<tweets.length; i++){
			var text = tweets[i].text;
			var username = tweets[i].user.screen_name;
			var timestamp = tweets[i].created_at;
			var tweet_id = tweets[i].id_str;
			//process/transform data for display
			//these next two add html, and then we output the unescaped html.
			text = this.parse_links(text);
			text = this.parse_hashtags_and_replies(text);
			var tweet_url = this.make_tweet_url(tweet_id);
			timestamp = this.parse_twitter_date(timestamp);
			
			var new_tweet = this.store.createRecord("tweet", {text: text, username: username, timestamp: timestamp, tweet_url: tweet_url});
			this.get("tweet_records").addObject(new_tweet);
			new_tweet.save();
		}

		this.save();

	},

	//input: <day of week> <month> <day> <24 hr time hh:mm::ss> <timezone?> <year>
	//output: <day of week> <month> <day> <24 hr time hhmm>
	parse_twitter_date: function(timestamp){
		var date_tokens = timestamp.split(":");
		var date_pieced_by_spaces = date_tokens[0].split(" ");
		var date_for_timezone_adjustment = {};
		date_for_timezone_adjustment["hour"] = date_pieced_by_spaces[3];
		date_for_timezone_adjustment["day"] = date_pieced_by_spaces[2];
		var date_adjusted_for_timezone = this.adjust_for_user_timezone(date_for_timezone_adjustment);
		date_pieced_by_spaces[2] = date_adjusted_for_timezone["day"]
		date_pieced_by_spaces[3] = date_adjusted_for_timezone["hour"]
		return date_pieced_by_spaces[0] + " " + date_pieced_by_spaces[1] + " " + date_pieced_by_spaces[2] + " " + date_pieced_by_spaces[3] + date_tokens[1];
	},

	parse_links: function(text){
		var words = text.split(" ");
		var i;
		var delimiter = "";
		var parsed_text = "";
		for(i = 0; i < words.length; i++){
			if( words[i].search("http://") !== -1 || words[i].search("https://") !== -1){
				words[i] = '<a href="'+ words[i] + '">' + words[i] + '</a>';
			}
			parsed_text = parsed_text + delimiter + words[i];
			delimiter = " ";
		}

		return parsed_text;
	},

	parse_hashtags_and_replies: function(text){
		var words = text.split(" ");
		var i;
		var delimiter = "";
		var parsed_text = "";
		for(i = 0; i < words.length; i++){
			if( words[i][0] === "#"){
				var hashtag_without_pound = words[i].slice(1);
				words[i] = '<a class = "red_text" href="http://www.twitter.com/hashtag/' + hashtag_without_pound + '">' + words[i] + '</a>';
			}
			else if(words[i][0] === "@"){
				var username = words[i].slice(1);
				words[i] = '<a class = "red_text" href="http://www.twitter.com/' + username + '">' + words[i] + '</a>';
			}

			parsed_text = parsed_text + delimiter + words[i];
			delimiter = " ";
		}

		return parsed_text;
	},

	make_tweet_url: function(tweet_id){
		return "http://twitter.com/alexpelan/status/" + tweet_id;
	},
	
})

