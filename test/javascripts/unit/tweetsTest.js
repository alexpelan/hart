var store;
var tweets;

module("Unit Test: Tweets", {

	setup: function(){
		store = App.__container__.lookup("store:main"); //WOOF. But for my purposes, the best way to do this - I don't believe in refactoring properties to a mixin just for the sake of testing. see http://discuss.emberjs.com/t/unit-testing-ember-data-models/3130
		Ember.run(function(){
			tweets = store.createRecord("tweets", {});	
		});
	},	
		
});

test("is_model_populated property tells whether there are tweets or not", function(){

	
	Ember.run(function(){
		tweet = store.createRecord("tweet", {});
		strictEqual(tweets.get("is_model_populated"), false, "Is_model_populated is not true for tweets record without any associated tweet records");
	});


	Ember.run(function(){	
		tweets.get("tweet_records").addObject(tweet);
		strictEqual(tweets.get("is_model_populated"), true, "Is_model_populated is true once there are associated tweet records");
	});

});

test("parse_links wraps any urls in <a> tags", function(){

	var text = "The text of this tweet has an url. That url is http://www.google.com";
	var https_text = "The text of this tweet has an url. That url is https://www.google.com";

	text = tweets.parse_links(text);
	strictEqual(text, 'The text of this tweet has an url. That url is <a href="http://www.google.com">http://www.google.com</a>', "Parse links wraps any http urls in <a> tags");
		
	https_text = tweets.parse_links(https_text);
	strictEqual(https_text, 'The text of this tweet has an url. That url is <a href="https://www.google.com">https://www.google.com</a>', "Parse links wraps any https urls in <a> tags");

});

test("parse_hashtags_and_replies adds style and links to hashtags and replies", function(){
	
	var hashtag_text = "This text contains a #hashtag";
	var at_reply_text = "This text contains an @reply";

	hashtag_text = tweets.parse_hashtags_and_replies(hashtag_text);
	strictEqual(hashtag_text, 'This text contains a <a class = "red_text" href="http://www.twitter.com/hashtag/hashtag">#hashtag</a>', "parse_hashtags_and_replies adds a link to any hashtag and turns it red");

	at_reply_text = tweets.parse_hashtags_and_replies(at_reply_text);
	strictEqual(at_reply_text, 'This text contains an <a class = "red_text" href="http://www.twitter.com/reply">@reply</a>', "parse_hashtags_and_replies adds a link to any at reply and turns it red");
});

test("make_tweet_url properly appends the tweet id", function(){

	var tweet_id = "123456789";
	var tweet_url = tweets.make_tweet_url(tweet_id);
	strictEqual(tweet_url, "http://twitter.com/alexpelan/status/123456789");
});

test("parse_twitter_date properly adjusts time zone and formats properly for display", function(){

	var date_string = "Mon Aug 15 12:00:00 +0000 2014";
	var timezone_adjustment = client_timezone_adjustment();
	date_string = tweets.parse_twitter_date(date_string);
	var correct_hour = 12 + timezone_adjustment;

	if(correct_hour < 12){
		correct_hour = "0" + correct_hour;
	}
	
	strictEqual(date_string, "Mon Aug 15 " + correct_hour + "00");

});





