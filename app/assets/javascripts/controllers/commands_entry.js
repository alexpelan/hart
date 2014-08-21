App.CommandsEntryController = Ember.ArrayController.extend({

	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
			var tokens = userInput.split(" ");
			input = tokens[0].toLowerCase();
			var output;
			//TODO: factor out the contents of each if statement to subroutine - getting a litle long
			if (input === "portfolio"){
				portfolio = this.store.createRecord("portfolio", {});
				command = this.store.createRecord("command", {input: userInput, type: "portfolio", portfolio: portfolio});	
				portfolio.get_projects_from_github().then(
					function(response){
						portfolio.populate_attributes(response);
						command.save();
					});
				command.save();
			}
			else if (input === "tweets"){
				var number_of_tweets = 5;
				if (tokens.length > 1){
					number_of_tweets = tokens[1];
					number_of_tweets = parseInt(number_of_tweets)
					if (isNaN(number_of_tweets)){
						number_of_tweets = 5;
					}
				}
				//Have to create records up here because we don't have access to this.store in the callback
				tweets = this.store.createRecord("tweets", {});
				command = this.store.createRecord("command", {input: userInput, type: "tweets", tweets: tweets})
				tweets.get_tweets_from_server(number_of_tweets).then(
					function(response){
						tweets.link_to_command(command);
						tweets.populate_attributes(response);
						command.save();
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
		 

	}		

});
