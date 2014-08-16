App.CommandsEntryController = Ember.ArrayController.extend({

	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
			userInput = userInput.toLowerCase();
			var output;
			var command;
			if (userInput === "portfolio"){
				output = "Here's a portfolio for you";
				command = this.store.createRecord("command", {input: userInput, output: output, type: "portfolio"});
				command.save();
			}
			else if (userInput === "tweets"){
				output = "Here are some tweetz";
				//Have to create records up here because we don't have access to this.store in the callback
				command = this.store.createRecord("command", {input: userInput, output: output, type: "tweets"})
				tweets = this.store.createRecord("tweets");
				tweets.get_tweets_from_server().then(
					function(response){
						tweets.link_to_command(command);
						tweets.populate_attributes(response);
						command.save();
					});
			}
			else if (userInput === "clear"){
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
