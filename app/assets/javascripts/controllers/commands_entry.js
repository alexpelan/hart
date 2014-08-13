App.CommandsEntryController = Ember.ArrayController.extend({

	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
			userInput = userInput.toLowerCase();
			var output;
			if (userInput === "portfolio"){
				output = "Here's a portfolio for you";
			}
			else if (userInput === "tweets"){
				output = "Here are some tweetz";
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
			var command = this.store.createRecord("command", {input: userInput, output: output});
			command.save();
		},
		 

	}		

});
