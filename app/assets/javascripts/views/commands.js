App.CommandsView = Ember.View.extend({
	templateName: "commands",
	didInsertElement: function(){
		var message = "Welcome to my personal website! Type commands to learn more about me. Type \"help\" for a list of commands.";
		var target = "#introduction_message";
		this.typewriterEffect(message, target);
	},

	typewriterEffect: function(message, target){
		var current_length = $(target).text().length;
		if(current_length === message.length){
			return
		}
		else{
			var message_to_output = message.substring(0, current_length + 1);
			$(target).text(message_to_output);
			var self = this;
			setTimeout(function(){
				self.typewriterEffect(message, target);
				}, 50);
		}
	},
});
