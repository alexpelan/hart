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
			}
			else if (userInput === "tweets"){
				output = "Here are some tweetz";
				command = this.store.createRecord("command", {input: userInput, output: output, type: "tweets"});
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
			command.save();
		},
		 

	}		

});
