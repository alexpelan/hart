App.Store = DS.Store.extend({

});

// Override the default adapter with the `DS.ActiveModelAdapter` which
// is built to work nicely with the ActiveModel::Serializers gem.
App.ApplicationAdapter = DS.ActiveModelAdapter.extend({

});


DS.RESTAdapter.reopen({
	namespace: 'api/v1'
})

//Use fixture adapter for "history" since we don't care if it persists beyond the session
App.CommandAdapter = DS.FixtureAdapter.extend();
App.TweetsAdapter = DS.FixtureAdapter.extend();
App.TweetAdapter = DS.FixtureAdapter.extend();
