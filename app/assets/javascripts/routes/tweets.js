App.TweetsRoute = Ember.Route.extend({
	model: function() {
		tweets = this.store.createRecord("tweets");
		console.log("model called");
		return tweets
	} //{ return this.store.find('tweet') }
})
