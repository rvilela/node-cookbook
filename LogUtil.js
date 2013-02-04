var Colors = require('colors');
var LogUtil = function(chave, valor) {
	console.log('' + (new LogMessage(chave, valor)));
};

var LogMessage = function(c, v) {
	this.chave = '' + (c || '');
	this.valor = '' + (v || '');
	this.toString = function() {
		var now = new Date();
		// console.log('now = ' + now.toString());
		var ret = ''
				+ (now.getFullYear() + ((now.getMonth() > 8) ? '' : '0')
						+ (now.getMonth() + 1) + ((now.getDate() > 9) ? '' : '0')
						+ now.getDate() + ':' + now.getHours() + ''
						+ now.getMinutes() + now.getSeconds()).green + ' '
				+ this.chave.blue + ': ' + this.valor.red;
		return ret;
	};
};

module.exports = LogUtil;
