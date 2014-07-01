class LastfmHelper

	def initialize
		@lastfm = Lastfm.new(ENV["LASTFM_API_KEY"], ENV["LASTFM_API_SECRET"])	
	end

	def get_recently_played(count)
		if count.nil?
			count = 5
		end
		recent_tracks = @lastfm.user.get_recent_tracks(user: "alexpelan", limit: count)
		return recent_tracks
	end
end
