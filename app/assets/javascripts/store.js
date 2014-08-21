App.Store = DS.Store.extend({

});

//We're using the fixture adapter since we don't want user actions to persist after they leave the page
////But there's a bug in the JSON serializer such that it doesn't serialize many-to-one associations right
////This code is a workaround to that. See: http://discuss.emberjs.com/t/ember-data-fixture-adapter-saving-record-loses-has-many-relationships/2821/3
DS.JSONSerializer.reopen({
	serializeHasMany: function(record, json, relationship){
		var key = relationship.key;

		var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
				
		if(relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne'){
			json[key] = Ember.get(record, key).mapBy('id');
		}
	}
});

//Use the fixture adapter since we don't save the users command history, but we want it to display on the screen while they're on the site
App.ApplicationAdapter = DS.FixtureAdapter.extend({

});
