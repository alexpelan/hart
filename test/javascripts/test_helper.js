//= require application
//= require_tree .
//= require_self
//
// From this gist:https://gist.github.com/ianpetzer/5779901#file-gistfile1-txt
document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
document.write('<style>#ember-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; } #ember-testing { zoom: 50%; }</style>');

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector){
	return !!find(selector).length;
}

function client_timezone_adjustment(){
	 return -(new Date().getTimezoneOffset() / 60); // because we use the client time, we need to
}
