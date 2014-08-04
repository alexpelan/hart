App.Project = DS.Model.extend({
	name: DS.attr('string'),
	watchersCount: DS.attr('number'),
	stargazersCount: DS.attr('number'),
	description: DS.attr('string'),
	projectUrl: DS.attr('string'),
	repoUrl: DS.attr('string'),
	language: DS.attr('string'),
	extra_display_information: DS.attr('string'),
})
