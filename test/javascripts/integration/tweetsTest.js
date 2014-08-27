module("Tweets", {
	setup: function(){
		Ember.run(App, App.advanceReadiness);
	},

	//Why this silly manual teardown instead of App.reset()?
	//I was seeing all sorts of unpredictable errors in teardowns, which I think is because my controller actions are asynchronous (error was calling set on destroyed object)
	//Since we don't have any route changes, calling clear will get us back to the initial state
	teardown: function(){
		fillIn("input#command_input", "clear");
		click("input.terminal_styling");
	}
});

test("Tweet responses contain the proper markup", function(){

	visit("/");
	fillIn("input#command_input", "tweets");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("li").length, 2, "Two list elements exist");
		strictEqual(find("span.tweet").length, 5, "Default number of tweets returned is five.");
		ok(find("span.tweet > a").length >= 5, "Each tweet has at least one link");
	});


});

test("The number of tweets parameter returns that number of tweets", function(){
	
	visit("/");
	fillIn("input#command_input", "tweets 50");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("span.tweet").length, 50, "Requesting 50 tweets returns 50 tweets.");
	});

});

test("Invalid parameters return the default number of tweets", function(){
	
	visit("/");
	fillIn("input#command_input", "tweets invalid");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("span.tweet").length, 5);
	});

});
