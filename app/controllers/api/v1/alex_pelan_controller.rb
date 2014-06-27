class Api::V1::AlexPelanController < ApplicationController
	require "github_helper"

	respond_to :json


	#hardcoding which projects are shown, but still getting stats from github API
	def portfolio
		github = GithubHelper.new
		repos = github.get_portfolio_information
		respond_with repos
	end


end
