require 'spec_helper'

describe Api::V1::AlexPelanController do

	describe 'GET #portfolio' do
		before(:each) { get :portfolio, :format => :json }

		it "populates the 3 projects" do
			expect(json['alex_pelan'].count).to eq 3
		end
		
		
		it "contains the proper JSON keys for github projects" do
			project_hash  = json['alex_pelan'][0]
			expect(project_hash).to have_key('description')
			expect(project_hash).to have_key('language')
			expect(project_hash).to have_key('name')
			expect(project_hash).to have_key('extra_display_information')
			expect(project_hash).to have_key('stargazers_count')
			expect(project_hash).to have_key('watchers_count')
			expect(project_hash).to have_key('repo_url')
			expect(project_hash).to have_key('project_url')
		end
	end

	describe 'GET #tweets' do
		it "responds with the requested number of tweets" do
			get :tweets, count: 10, :format => :json
			# we have "include rts set to false, so it filters those out rather than giving me a different tweet in its place
			# pretty silly imo
			expect(json['alex_pelan'].count).to be_between(0,10)
		end

		it "contains the proper JSON keys for tweets" do
			get :tweets, :format => :json
			first_tweet = json['alex_pelan'][0]
			expect(first_tweet).to have_key("text")
			expect(first_tweet).to have_key("user")
			expect(first_tweet).to have_key("id")
		end
	end

	describe 'GET #currently_reading' do
		before(:each) {get :currently_reading, :format => :json}

		# of course, this can manually be screwed up by me :)
		it "responds with only one book" do
			expect(json["books"].count).to eq 1
		end

		it "contains the proper JSON keys for goodreads books" do
			first_book = json["books"][0]["book"]
			expect(first_book).to have_key("description")
			expect(first_book).to have_key("title")
			expect(first_book).to have_key("image_url")
		end
	end

	describe 'GET #recently_played' do
		before(:each) {get :recently_played, count: 10, :format => :json}
		
		it "responds with the requested number of songs" do
			expect(json["alex_pelan"].count).to be_between(10,11) #more annoying inconsistency from APIs - if currently listening, it returns the current track as well as the 10 previous
		end
		it "contains the proper JSON keys for songs" do
			first_song = json["alex_pelan"][0]
			expect(first_song).to have_key("artist")
			expect(first_song).to have_key("name")
			expect(first_song).to have_key("album")
		end
	end

	describe 'GET #recently_drank' do
		before(:each) {get :recently_drank, count: 50, :format => :json}

		it "responds with the requested number of beers" do
			expect(json["checkins"]["count"]).to eq 50
		end

		it "contains the proper JSON keys for beers" do
			first_checkin = json["checkins"]["items"][0]
			expect(first_checkin).to have_key("beer")
			expect(first_checkin).to have_key("brewery")
		end
	end

end
