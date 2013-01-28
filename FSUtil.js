var FSUtil = function() {
	var fs = require('fs');
	this.getFilesName = function(path) {
		return fs.readdirSync(path).sort();
	};
	this.IN_FILENAME = /2013/;
	this.filter = function(regExp, nArq) {
		return regExp.test(nArq);
	};
	this.process = function() {
		return regExp.test(nArq);
	};
	this.processFile = function(nArq) {
		console.log(nArq);
	};
};
module.exports = FSUtil;

/*
var fsUtil = new FSUtil();
var myCallback = function(e, i) {
	if (fsUtil.filter(fsUtil.IN_FILENAME, e)) {
		fsUtil.processFile('[' + i + '] : ' + e);
	}
};
fsUtil.getFilesName('./').forEach(myCallback);
*/