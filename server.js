var http = require('http');
var path = require('path');
var pages = [ {
	route : '',
	output : 'Woohoo!'
}, {
	route : '/about1/this',
	output : 'Multilevel routing with Node'
}, {
	route : '/about1/node',
	output : 'Evented I/O for V8 JavaScript.'
}, {
	route : 'about',
	output : 'A simple routing with Node example'
}, {
	route : 'another-page',
	output : function() {
		return 'Here\'s ' + this.route;
	}
}, {
	route : 'about2',
	/* output : 'A simple routing with Node example for <b>about2</b>',*/
	childRoutes : [ {
		route : 'node',
		output : 'Evented I/O for V8 Javascript'
	}, {
		route : 'this',
		output : 'Complex Multilevel Example'
	} ]
} ];

http.createServer(
		function(request, response) {
			var lookup = path.basename(decodeURI(request.url)); 
			// var lookup = decodeURI(request.url);
			pages.forEach(function(page) {
				console.log(lookup);
				if (page.route === lookup) {
					response.writeHead(200, {
						'Content-Type' : 'text/html'
					});
					response.end(typeof page.output === 'function' ? page
							.output() : page.output);
				}
			});
			if (!response.finished) {
				response.writeHead(404);
				response.end('Page Not Found!');
			}
		}).listen(80);
