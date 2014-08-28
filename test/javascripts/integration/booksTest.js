module("Books", {
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

test("Book responses contain the proper markup", function(){

	visit("/");
	fillIn("input#command_input", "books");
	click("input.terminal_styling");

	andThen(function(){
		strictEqual(find("li").length, 2, "Two list elements exist");
		ok(exists("li > img"), "The book cover art is shown as an image");
		ok(exists("h3:contains('by')"), "The author and title are listed");
	});


});
