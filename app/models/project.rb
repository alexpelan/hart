class Project
        attr_accessor :name	
	attr_accessor :watchers_count
	attr_accessor :stargazers_count
	attr_accessor :project_url
	attr_accessor :repo_url
	attr_accessor :language
	attr_accessor :description
	attr_accessor :extra_display_information #basically a catch-all to modify the display without breaking the versioning of the API

	def populate_attributes(repo)
		self.name = repo.name
		self.watchers_count = repo.watchers_count
		self.stargazers_count = repo.stargazers_count
		self.project_url = repo.homepage
		self.repo_url = repo.html_url
		self.language = repo.language
		self.description = repo.description
		self.extra_display_information = nil
	end

end
