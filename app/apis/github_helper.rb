class GithubHelper

	def initialize
		@github = Github.new
	end

	def get_portfolio_information
	
		#Get each repo that we're interested in
		hart = @github.repos.get user: "alexpelan", repo: "hart"
		lujack = @github.repos.get user: "alexpelan", repo: "lujack"
          	bertelli = @github.repos.get user: "alexpelan", repo: "bertelli"

		#Take only the attributes that we're interested in, as well as calculated information
		hart_project = Project.new
		hart_project.populate_attributes(hart)
		#TODO: add video/screenshot

		lujack_project = Project.new
		lujack_project.populate_attributes(lujack)
		#TODO: add video/screenshot
		

		bertelli_project = Project.new
		bertelli_project.populate_attributes(hart)
		#TODO: add video/screenshot
	

		return [hart_project, lujack_project, bertelli_project]

	end	



end
