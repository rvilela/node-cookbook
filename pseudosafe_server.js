/*NOT FOR PRODUCTION USE!!!!*/
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
  var lookup = url.parse(decodeURI(request.url)).pathname;
  console.log(lookup);
//  lookup = path.normalize(lookup);
//  console.log('Depois do path.normalize: ' + lookup);
  lookup = (lookup === "/") ? '/index.html' : lookup;
  var f = 'content' + lookup;
  console.log(f);
  fs.exists(f, function (exists) { //path.exists for Node 0.6 and below
    if (!exists) {
      response.writeHead(404);
      response.end('Page Not Found!');
      return;
    }
    fs.readFile(f, function (err, data) {
      response.end(data);
    });

  });


}).listen(80);

