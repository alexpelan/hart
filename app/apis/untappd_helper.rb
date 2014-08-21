class UntappdHelper

	def initialize
		Untappd.configure do |config|
			config.client_id = ENV["UNTAPPD_CLIENT_ID"]
			config.client_secret = ENV["UNTAPPD_CLIENT_SECRET"]
			config.gmt_offset = -5
		end
	end

	def get_recently_drank(count)
		if count.nil?
			count = 10
		end
		recently_drank = Untappd::User.feed("alexpelan", :limit => count)
		return recently_drank
	end

end
