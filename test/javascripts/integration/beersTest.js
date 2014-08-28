module("Beers", {
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

test("Beer responses contain the proper markup", function(){

	visit("/");
	fillIn("input#command_input", "beers");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("li").length, 2, "Two list elements exist");
		strictEqual(find("span.beer").length, 10, "Default number of beers returned is ten.");
		strictEqual(find("span.beer > a").length, 10, "Each beer has exactly one link");
	});


});

test("The number of beers parameter returns that number of beers", function(){
	
	visit("/");
	fillIn("input#command_input", "beers 50");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("span.beer").length, 50, "Requesting 50 beers returns 50 beers.");
	});

});

test("Invalid parameters return the default number of beers", function(){
	
	visit("/");
	fillIn("input#command_input", "beers invalid");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("span.beer").length, 10);
	});

});
