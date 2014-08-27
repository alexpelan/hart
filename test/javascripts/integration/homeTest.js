module("Home Page",{
	setup: function(){
		App.reset();
		Ember.run(App, App.advanceReadiness);
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
