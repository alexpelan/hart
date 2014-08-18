App.Store = DS.Store.extend({

});

// Override the default adapter with the `DS.ActiveModelAdapter` which
// is built to work nicely with the ActiveModel::Serializers gem.
App.ApplicationAdapter = DS.ActiveModelAdapter.extend({

});


DS.RESTAdapter.reopen({
	namespace: 'api/v1'
})

//We're using the fixture adapter since we don't want user actions to persist after they leave the page
//But there's a bug in the JSON serializer such that it doesn't serialize many-to-one associations right
//This code is a workaround to that. See: http://discuss.emberjs.com/t/ember-data-fixture-adapter-saving-record-loses-has-many-relationships/2821/3
DS.JSONSerializer.reopen({
	serializeHasMany: function(record, json, relationship){
		var key = relationship.key;

		var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

		if(relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne'){
			json[key] = Ember.get(record, key).mapBy('id');
		}
	}

});

//Use fixture adapter for "history" since we don't care if it persists beyond the session
App.CommandAdapter = DS.FixtureAdapter.extend();
App.TweetsAdapter = DS.FixtureAdapter.extend();
App.TweetAdapter = DS.FixtureAdapter.extend();
