App.ApplicationController = Ember.ObjectController.extend({

	content: {},
	
	actions: {
		respondToCommand: function(){
			var userInput = this.get('command');
			userInput = userInput.toLowerCase();
			if (userInput === "portfolio"){
				this.transitionToRoute("portfolio");
			}
			else if (userInput === "tweets"){
				this.transitionToRoute("tweets");
			}
		}

	}		

});
