class Api::V1::AlexPelanController < ApplicationController
	require "github_helper"
	require "twitter_helper"
	require "goodreads_helper"
	require "lastfm_helper"
	require "untappd_helper"

	respond_to :json


	#hardcoding which projects are shown, but still getting stats from github API
	def portfolio
		github = GithubHelper.new
		
		begin
			repos = github.get_portfolio_information
			respond_with repos
		rescue Github::Error::GithubError => e
			logger.debug("Github error: " + e.message.inspect)
			render :json => { :error_message => e.message}, :status => 442
		end
	end

	def tweets
		count = params[:count]
		twitter = TwitterHelper.new

		begin
			tweets = twitter.recent_tweets(count)
			respond_with tweets
		rescue Twitter::Error => e
			logger.debug("Twitter error: " + e.message.inspect)
			render :json => { :error_message => e.message}, :status => 442
		end
	end

	def currently_reading
		goodreads = GoodreadsHelper.new

		begin
			currently_reading_shelf = goodreads.get_currently_reading
			respond_with currently_reading_shelf
		rescue Goodreads::Error => e
			logger.debug("Goodreads error: " + e.message.inspect)
			render :json => { :error_message => e.message}, :status => 442
		end
	end

	def recently_played
		count = params[:count]
		lastfm = LastfmHelper.new

		begin
			recently_played_tracks = lastfm.get_recently_played(count)
			respond_with recently_played_tracks
		rescue Lastfm::Error => e
			logger.debug("Last.fm error: " + e.message.inspect)
			render :json => { :error_message => e.message}, :status => 442
		end	
	end

	def recently_drank
		count = params[:count]
		untappd = UntappdHelper.new
		recently_drank_beers = untappd.get_recently_drank(count)
		#No error handling since our gem doesn't have any error handling
		respond_with recently_drank_beers
	end

end
