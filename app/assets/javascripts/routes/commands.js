App.CommandsRoute = Ember.Route.extend({
	
	model: function() { return this.store.find('command') },
	//model: function() { return [] },
})
