App.CommandOutputView = Ember.View.extend({
	tagName: "li",
	classNames: ['terminal'],
	//Render a different template depending on the type of data a command asked for
	templateName: function(){
		var contentType = this.get("content.type");
		//the following line capitalizes the first letter
		contentType = contentType.charAt(0).toUpperCase() + contentType.slice(1);
		return "CommandOutput" + contentType;
	}.property(),

})
