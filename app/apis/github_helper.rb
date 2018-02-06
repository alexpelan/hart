class GithubHelper

	def initialize
		@github = Github.new
	end

	def get_portfolio_information
	
		#Get each repo that we're interested in
		hart = @github.repos.get user: "alexpelan", repo: "hart"
		popcode = @github.repos.get user: "popcodeorg", repo: "popcode"
        huarte = @github.repos.get user: "alexpelan", repo: "huarte"
        hornung = @github.repos.get user: "alexpelan", repo: "hornung"

		#Take only the attributes that we're interested in, as well as calculated information
		hart_project = Project.new
		hart_project.populate_attributes(hart)
		hart_project.screenshot_url = "https://i.imgur.com/DqQMyHX.jpg"
		hart_project.blog_post_url = "http://alexpelan.tumblr.com/post/97307077530/a-portfolio-and-personal-api-using-ember-js-with-a"

		popcode_project = Project.new
		popcode_project.populate_attributes(popcode)
		popcode_project.screenshot_url = "https://i.imgur.com/fiMZRVm.png"
		popcode_project.project_url = "https://www.popcode.org"

		huarte_project = Project.new
		huarte_project.populate_attributes(huarte)
		huarte_project.screenshot_url = "https://i.imgur.com/s3HQyr6.png"

		hornung_project = Project.new
		hornung_project.populate_attributes(hornung)
		hornung_project.screenshot_url = "https://i.imgur.com/QXl3Dko.png"

		if hart_project.valid? and popcode_project.valid? and huarte_project.valid? and hornung_project.valid?
			return [hart_project, huarte_project, hornung_project, popcode_project]
		else
			return []
		end
	end	



end
