App.CommandsRoute = Ember.Route.extend({
	
	model: function() {
		//Log that a user visited the model
		var user_action = this.store.createRecord("uaction", {action: "Visited page"});
		user_action.save();
		return this.store.find("command");
	},
});
