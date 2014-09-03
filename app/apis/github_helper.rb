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
		hart_project.screenshot_url = "http://i.imgur.com/DqQMyHX.jpg"
		hart_project.blog_post_url = "about:blank" #TODO: write this post and link it up here


		lujack_project = Project.new
		lujack_project.populate_attributes(lujack)
		lujack_project.screenshot_url = "http://i.imgur.com/7eP56PC.jpg"
		lujack_project.blog_post_url = "http://alexpelan.tumblr.com/post/89700507255/my-favorite-tweeters"

		bertelli_project = Project.new
		bertelli_project.populate_attributes(bertelli)
		bertelli_project.screenshot_url = "http://i.imgur.com/Pwq75dv.jpg"	
		bertelli_project.blog_post_url = "http://alexpelan.tumblr.com/post/63319011149/i-made-a-thing-bertelli-edition"

		if hart_project.valid? and lujack_project.valid? and bertelli_project.valid?
			return [hart_project, lujack_project, bertelli_project]
		else
			return []
		end
	end	



end
