class Api::V1::AlexPelanController < ApplicationController
	require "github_helper"
	require "twitter_helper"
	require "goodreads_helper"

	respond_to :json


	#hardcoding which projects are shown, but still getting stats from github API
	def portfolio
		github = GithubHelper.new
		repos = github.get_portfolio_information
		respond_with repos
	end

	def tweets
		count = params[:count]
		twitter = TwitterHelper.new
		tweets = twitter.recent_tweets(count)
		respond_with tweets
	end

	def currently_reading
		goodreads = GoodreadsHelper.new
		currently_reading_shelf = goodreads.get_currently_reading
		respond_with currently_reading_shelf
	end
end
