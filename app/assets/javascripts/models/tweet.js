App.Tweet = DS.Model.extend({
	text: DS.attr('string'),
	timestamp: DS.attr('string'),
	username: DS.attr('string'),
	
	tweets: DS.belongsTo('tweets'),
})
