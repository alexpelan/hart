module("Home Page",{

	setup: function(){
        	Ember.run(App, App.advanceReadiness);
	},

	teardown: function(){
		fillIn("input#command_input", "clear");
		click("input.terminal_styling");
	},
			                                                                 
});

test("Check appropriate elements are returned", function(){

	visit("/").then(function(){
		ok(exists("*"), "Found HTML!");
		ok(exists("div.title_bar"), "Title bar exists");
		ok(exists("div#terminal_div"), "Terminal div exists");
		ok(exists("input#command_input"), "Command input exists");
	});

});

test("About command shows Alex's biography", function(){

	visit("/");
	fillIn("input#command_input", "about");
	click("input.terminal_styling");

	andThen(function(){
		ok(exists("h2:contains('Biography')"), "Biography section is displayed");
		ok(exists("h2:contains('Resume')"), "Resume section is displayed");
		ok(exists("h2:contains('Writing')"), "Writing section is displayed");
		ok(exists("h2:contains('Contact')"), "Contact section is displayed");
	});
});

test("Help command shows the help text", function(){
	
	visit("/");
	fillIn("input#command_input", "help");
	click("input.terminal_styling");

	andThen(function(){
		ok(exists("span.help"));
	});

});

test("Invalid commands show the help text", function(){

	visit("/");
	fillIn("input#command_input", "invalid");
	click("input.terminal_styling");

	andThen(function(){
		ok(exists("span.help"), "Help text is shown");
		ok(exists(":contains('a valid command.')"), "Error message is shown");
	});

});

