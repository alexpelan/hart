module("Home Page",{
	setup: function(){
		Ember.run(App, App.advanceReadiness);
	},
	teardown: function(){
		App.reset();
	}
});

test("Check appropriate elements are returned", function(){

	visit("/").then(function(){
		ok(exists("*"), "Found HTML!");
		ok(exists("div.title_bar"), "Title bar exists");
		ok(exists("div#terminal_div"), "Terminal div exists");
		ok(exists("input#command_input"), "Command input exists");
	});

});
