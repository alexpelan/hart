App.CommandsEntryController = Ember.ArrayController.extend({

	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
		
			//Log what the user typed so we can analyze for usage patterns
			var user_action = this.store.createRecord("uaction", {action: userInput});
			user_action.save();

			this.set("command",""); //clear out field in UI
			var tokens = userInput.split(" ");
			input = tokens[0].toLowerCase();
			if (input === "portfolio"){
				this.create_portfolio_command(userInput);
			}
			else if (input === "tweets"){
				this.create_tweets_command(userInput, tokens);
			}
			else if (input === "music"){
				this.create_songs_command(userInput, tokens);	
			}
			else if (input === "beers"){
				this.create_beers_command(userInput, tokens);	
			}
			else if (input === "books"){
				this.create_books_command(userInput);
			}
			else if (input === "clear"){
				this.clear_all_commands();				
			}
			else if (input === "about"){
				var about_command = this.store.createRecord("command", {input: userInput, type: "about"});
				about_command.save();
				this.scroll_to_bottom();
			}
			else{
				var is_error = true;
				if(input === "help"){
					is_error = false;
				}
				var help_or_error_command = this.store.createRecord("command", {input: userInput, type: "help", is_error: is_error});
				help_or_error_command.save();
				this.scroll_to_bottom();
			}

		},
		 

	},

	create_portfolio_command: function(userInput){
		var portfolio = this.store.createRecord("portfolio", {});
		var command = this.store.createRecord("command", {input: userInput, type: "portfolio", portfolio: portfolio});	
		portfolio.get_projects_from_github().then(
			function(response){
				Ember.run(function(){
					portfolio.populate_attributes(response);
					command.save();
				});
			},
			//Failure
			function(response){
				portfolio.handle_api_errors(response);
				command.save();
			});

	},

	create_tweets_command: function(userInput, tokens){
		var number_of_tweets = this.parse_number_of_objects_argument(tokens, 5);
		var tweets = this.store.createRecord("tweets", {});
		var command = this.store.createRecord("command", {input: userInput, type: "tweets", tweets: tweets})
		var self = this;
		tweets.get_tweets_from_server(number_of_tweets).then(
			function(response){
				Ember.run(function(){
					tweets.populate_attributes(response);
					command.save();
					self.scroll_to_bottom();
				});
			},
			//Failure
			function(response){
				tweets.handle_api_errors(response);
				command.save();
			});
		},

	create_songs_command: function(userInput, tokens){
		var number_of_songs = this.parse_number_of_objects_argument(tokens, 10);
			
		var songs = this.store.createRecord("songs", {});
		var command = this.store.createRecord("command", {input: userInput, type: "songs", songs: songs});
		var self = this;
		songs.get_songs_from_lastfm(number_of_songs).then(
			function(response){
				Ember.run(function(){
					songs.populate_attributes(response);
					command.save();
					self.scroll_to_bottom();
				});
			},
			//Failure
			function(response){
				songs.handle_api_errors(response);
				command.save();
			});
	},

	create_beers_command: function(userInput, tokens){
		var number_of_beers = this.parse_number_of_objects_argument(tokens, 10);
				
		var beers = this.store.createRecord("beers", {});
		var command = this.store.createRecord("command", {input: userInput, type: "beers", beers: beers});
		var self = this;
		beers.get_beers_from_untappd(number_of_beers).then(
			function(response){
				Ember.run(function(){
					beers.populate_attributes(response);
					command.save();
					self.scroll_to_bottom();
					});
			});
	},

	create_books_command: function(userInput){
		var books = this.store.createRecord("books", {});
		var command = this.store.createRecord("command",{input: userInput, type: "books", books: books});
		var self = this;
		books.get_books_from_goodreads().then(
			function(response){
				Ember.run(function(){
					books.populate_attributes(response);
					command.save();
					self.scroll_to_bottom();
				});
			},
			//Failure
			function(response){
				books.handle_api_errors(response);
				command.save();
			});
	},

	clear_all_commands: function(){
		this.store.find("command").then(function(command){
			command.content.forEach(function(cmd){
				Ember.run.once(this, function(){
					cmd.deleteRecord();
					cmd.save();
				});
			}, this);
		});

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
