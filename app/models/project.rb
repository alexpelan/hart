class Project < ActiveRecord::Base
	attr_accessible :name, :watchers_count, :stargazers_count, :project_url, :repo_url, :language, :description, :screenshot_url, :blog_post_url

	validates :name, presence: true
	validates :watchers_count, presence: true
	validates :stargazers_count, presence: true
	validates :repo_url, presence: true
	validates :language, presence: true
	

	def populate_attributes(repo)
		self.name = repo.name
		self.watchers_count = repo.watchers_count
		self.stargazers_count = repo.stargazers_count
		self.project_url = repo.homepage
		self.repo_url = repo.html_url
		self.language = repo.language
		self.description = repo.description
		self.screenshot_url = nil
	end

end
