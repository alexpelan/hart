// For more information see: http://emberjs.com/guides/routing
App.Router.reopen({
	location: 'auto',
	rootURL: '/'
})

App.Router.map(function() {
  	this.resource('application', { path: '/'}, function() {
		this.route('portfolio');
		this.route('tweets');
	})		
});

