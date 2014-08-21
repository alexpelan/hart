App.Portfolio = DS.Model.extend({

	command: DS.belongsTo("command"),
	projects: DS.hasMany("project"),

	get_projects_from_github: function(){
		return $.getJSON("http://localhost:3000/api/v1/portfolio.json");
	},

	populate_attributes: function(response){
		var portfolio = response["alex_pelan"];
		var i;
		
		for(i = 0; i < portfolio.length; i++){
			var project = portfolio[i]["alex_pelan"];
			var name = project.name;
			var description = project.description;
			var repo_url = project.repo_url;
			var project_url = project.project_url;
			var language = project.language;
			var screenshot_url = project.screenshot_url;
			var blog_post_url = project.blog_post_url;
			var project_for_store = this.store.createRecord("project", { name: name, description: description, repo_url: repo_url, project_url: project_url, language: language, screenshot_url: screenshot_url, blog_post_url: blog_post_url});
			this.get("projects").addObject(project_for_store);
			project_for_store.save();
		}
		
		this.save();
	},
});


App.Portfolio.FIXTURES = [];
