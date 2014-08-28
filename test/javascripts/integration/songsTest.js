module("Songs", {
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

test("Song responses contain the proper markup", function(){

	visit("/");
	fillIn("input#command_input", "music");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("li").length, 2, "Two list elements exist");
		ok(find("span.song").length === 10 || find("span.song").length === 11, "Default number of songs returned is ten or eleven, depending on whether a song is currently playing.");
		ok(find("span.song > a").length === 11 || find("span.song > a").length === 10, "Each song has exactly one link");
	});


});

test("The number of songs parameter returns that number of songs", function(){
	
	visit("/");
	fillIn("input#command_input", "music 50");
	click("input.terminal_styling");

	andThen(function(){
		ok(find("span.song").length === 50 || find("span.song").length === 51, "Requesting 50 songs returns 50 songs plus an optional now playing song.");
	});

});

test("Invalid parameters return the default number of songs", function(){
	
	visit("/");
	fillIn("input#command_input", "music invalid");
	click("input.terminal_styling");

	andThen(function(){
		ok(find("span.song").length === 10 || find("span.song").length === 11);
	});

});
