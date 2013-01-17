var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

var processRequest = function(request, response) {
	  console.log('Inicio');
	  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
	    f = 'content/' + lookup;
	  console.log('log: ', f);
	  fs.exists(f, function (exists) { //path.exists for Node 0.6 and below
	    if (exists) {
		    fs.readFile(f, function (err, data) {
	        if (err) {response.writeHead(500); response.end('Server Error!'); return; }
	        var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
	        response.writeHead(200, headers);
	        response.end(data);
		    console.log('Arquivo lido: ', f);
	      });
	      return;
	    }
	    response.writeHead(404); //no such file found!
	    response.end('Page Not Found!');
	  });
};

http.createServer(processRequest).listen(80);
