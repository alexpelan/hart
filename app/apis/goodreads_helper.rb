class GoodreadsHelper
	
	def initialize
		@goodreads = Goodreads::Client.new(:api_key => ENV["GOODREADS_API_KEY"], :api_secret => ENV["GOODREADS_API_SECRET"])
	end

	def get_currently_reading
		shelf = @goodreads.shelf("3090097", "currently-reading")
		return shelf
	end

end
