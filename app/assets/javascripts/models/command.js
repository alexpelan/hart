App.Command = DS.Model.extend({
	input: DS.attr('string'),
	output: DS.attr('string'),
	type: DS.attr('string'),
});

App.Command.FIXTURES = [];
