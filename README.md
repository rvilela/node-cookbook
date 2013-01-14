node-cookbook
=============

estudo node cookbook

    Incluimos dois servers HTTP e estamos usando o hotnode 
    
O esqueleto do Servidor é esse abaixo :    
    
	var http = require('http');
	var path = require('path');
	var fs = require('fs');
	
	var mimeTypes = {
		'.js' : 'text/javascript',
		'.html' : 'text/html',
		'.css' : 'text/css'
	};
	
	var processRequest = function(request, response) {  
	    ...
	};
	
	http.createServer(processRequest).listen(80);  
	  
Depois faremos mais explicações	  