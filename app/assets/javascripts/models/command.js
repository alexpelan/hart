App.Command = DS.Model.extend({
	input: DS.attr('string'),
	output: DS.attr('string'),
	type: DS.attr('string'),

	//below this line, the attributes that are populated depend on the type
	tweets: DS.belongsTo('tweets'),
	portfolio: DS.belongsTo('portfolio'),
	songs: DS.belongsTo('songs'),
});

App.Command.FIXTURES = [];
