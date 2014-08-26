App.CommandsEntryController = Ember.ArrayController.extend({

	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
			this.set("command",""); //clear out field in UI
			var tokens = userInput.split(" ");
			input = tokens[0].toLowerCase();
			var output;
			//TODO: factor out the contents of each if statement to subroutine - getting a litle long
			if (input === "portfolio"){
				portfolio = this.store.createRecord("portfolio", {});
				command = this.store.createRecord("command", {input: userInput, type: "portfolio", portfolio: portfolio});	
				var self = this;
				portfolio.get_projects_from_github().then(
					function(response){
						portfolio.populate_attributes(response);
						command.save();
						self.scroll_to_bottom();
					});
			}
			else if (input === "tweets"){
				var number_of_tweets = this.parse_number_of_objects_argument(tokens, 5);
				
				tweets = this.store.createRecord("tweets", {});
				command = this.store.createRecord("command", {input: userInput, type: "tweets", tweets: tweets})
				var self = this;
				tweets.get_tweets_from_server(number_of_tweets).then(
					function(response){
						tweets.populate_attributes(response);
						command.save();
						self.scroll_to_bottom();
					});
			}
			else if (input === "music"){
				var number_of_songs = this.parse_number_of_objects_argument(tokens, 10);
			
				var songs = this.store.createRecord("songs", {});
				var command = this.store.createRecord("command", {input: userInput, type: "songs", songs: songs});
				var self = this;
				songs.get_songs_from_lastfm(number_of_songs).then(
					function(response){
						songs.populate_attributes(response);
						command.save();
						self.scroll_to_bottom();
					});
			}
			else if (input === "beers"){
				var number_of_beers = this.parse_number_of_objects_argument(tokens, 10);
				
				var beers = this.store.createRecord("beers", {});
				var command = this.store.createRecord("command", {input: userInput, type: "beers", beers: beers});
				var self = this;
				beers.get_beers_from_untappd(number_of_beers).then(
					function(response){
						beers.populate_attributes(response);
						command.save();
						self.scroll_to_bottom();
					});
			}
			else if (input === "books"){
				var books = this.store.createRecord("books", {});
				var command = this.store.createRecord("command",{input: userInput, type: "books", books: books});
				var self = this;
				books.get_books_from_goodreads().then(
					function(response){
						books.populate_attributes(response);
						command.save();
						self.scroll_to_bottom();
					});
			}
			else if (input === "clear"){
				this.store.find("command").then(function(command){
					command.content.forEach(function(cmd){
						Ember.run.once(this, function(){
							cmd.deleteRecord();
							cmd.save();
							});
						}, this);
					});
				return;
			}

		},
		 

	},

	parse_number_of_objects_argument: function(tokens, default_value){
		if (tokens.length > 1){
			number_of_objects = tokens[1];
			number_of_objects = parseInt(number_of_objects)
			if (isNaN(number_of_objects)){
				number_of_objects = default_value;
			}
		}
		else{
			number_of_objects = default_value;
		}

		return number_of_objects;
	},

	//Ember is doing some weird stuff where the height of the terminal isn't being updated
	//until too late for me to scroll, so I'm just throwing a magic number, 1 million, which will get
	//us to the bottom in all but the most extreme cases.
	scroll_to_bottom: function(){
		$("html, body").animate({
			scrollTop: 1000000
		}, 100);
	}		  
 
});
