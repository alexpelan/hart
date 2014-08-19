App.Project = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	project_url: DS.attr('string'),
	repo_url: DS.attr('string'),
	language: DS.attr('string'),
	screenshot_url: DS.attr('string'),
})
