App.CommandsEntryController = Ember.ArrayController.extend({

	onSuccess: function(){
		console.log("success");
	},

	onFailure: function(){
		console.log("failure");
	},
	
	actions: {
		
		respondToCommand: function(){
			var userInput = this.get("command");
			userInput = userInput.toLowerCase();
			var output;
			if (userInput === "portfolio"){
				//this.transitionToRoute("portfolio");
				output = "Here's a portfolio for you";
			}
			else if (userInput === "tweets"){
				//this.transitionToRoute("tweets");
				output = "Here are some tweetz";
			}
			var command = this.store.createRecord("command", {input: userInput, output: output});
			command.save();
		},
		 

	}		

});
