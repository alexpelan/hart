class TwitterHelper
	        
	def initialize
		@twitter = Twitter::REST::Client.new do |config|
			config.consumer_key        = ENV["CONSUMER_KEY"]
			config.consumer_secret     = ENV["CONSUMER_SECRET"]
			config.access_token        = ENV["ACCESS_TOKEN"]
			config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]									
		end
	end

	def recent_tweets(count)
		if count.nil?
			count = 5
		end
			
		options = {:count => count, :include_rts => true}
		tweets = @twitter.user_timeline("alexpelan", options)
		return tweets
	end

end   
