App.CommandOutputView = Ember.View.extend({
	tagName: "li",
	classNames: ['terminal'],
	templateName: function(){
		var contentType = this.get("content.type");
		//TODO: consider refactoring so that we just uppercase first letter and append that to CommandOutput
		if (contentType === "tweets"){
			return "CommandOutputTweets";
		}
		else if (contentType === "portfolio"){
			return "CommandOutputPortfolio";
		}
		else if (contentType === "songs"){
			return "CommandOutputSongs";
		}
		else if (contentType === "beers"){
			return "CommandOutputBeers";
		}
	}.property(),

})
