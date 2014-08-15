App.CommandOutputView = Ember.View.extend({
	tagName: "li",
	templateName: function(){
		var contentType = this.get("content.type");
	
		if (contentType === "tweets"){
			return "CommandOutputTweets";
		}
		else if (contentType === "portfolio"){
			return "CommandOutputPortfolio";
		}
	}.property(),

})
