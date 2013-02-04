var FSUtil = function(pathStr, regExp) {
	var fs = require('fs');
	var myMvMethod = require('mv');
	this.path = pathStr;
	this.FILENAME_REGEXP = regExp;
	// console.log('path string : "' + pathStr + '"');
	this.getFilesName = function() {
		// console.log('regExp : "' + this.FILENAME_REGEXP + '"');
		var myArray = fs.readdirSync(this.path);
		var retArray = [];
		for ( var i = 0; i < myArray.length; i++) {
			var elem = myArray[i];
			var epochDate = this.filter(this.FILENAME_REGEXP, elem);
			if (epochDate) {
				retArray.push(elem);
			}
		}

		return retArray.sort();
	};

	this.filter = function(regExp, nArq) {
		// console.log('filter : ' + regExp + ' - ' + nArq);
		if (regExp == undefined) {
			return false;
		}
		if (regExp.test(nArq)) {
			var myArray = regExp.exec(nArq);
			return myArray[1]; // A variavel que guarda o Epoch
		} else {
			return false;
		}
	};

	this.mv = function(source, destination) {
		console.log('movendo ' + source + '  >>> ' + destination);
		// console.log(myMvMethod);
		myMvMethod(source, destination, function(err) {
			if (err != undefined) {
				console.log('%s'.red.bold, err);
			}
		});
	};

	this.processInFile = function(nArq) {
		var msg = 'arquivo : ' + nArq + ' movido para diretorio tmp';
		// movendo os arquivos
		this.mv('./in/' + nArq, './tmp/' + nArq);
		console.log(msg);
	};

	this.callbackIn = function(e, i) {
		var epochDate = this.filter(this.FILENAME_REGEXP, e);
		if (epochDate) {
			var myDate = new Date(epochDate * 1000);
			var dateStr = myDate.toLocaleString();
			console.log('[' + i + '] : ' + 'Processando o arquivo relativo a ['
					+ dateStr + ']');

			this.processInFile(e);
		}
	};

	// fs.writeFileSync(fileName, str, 'utf8');

	this.processIn = function() {
		var fileNames = this.getFilesName();
		if (fileNames.length > 0) {
			// processo apenas o primeiro da lista
			this.callbackIn(fileNames[0], 0);
			return [ fileNames[0], (fileNames[0].split('.'))[0] + '.out' ];
		}
		return false;
	};

	this.write = function(fileName, msg) {
		// arquivo pode ser novo ou já existir
		// Se já existir limpa e atualiza com o novo valor
		fs.writeFileSync(fileName, msg); // encoding utf-8
		console.log('msg = ' + msg + ' foi salva em ' + fileName);
	};
};
module.exports = FSUtil;
