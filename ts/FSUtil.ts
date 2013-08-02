declare var require;

class FSUtil  {
    private static myself = null;
    private path: string;
    private regExp: RegExp;
    private myMvMethod: any;
    private fs: any;
    private FILENAME_REGEXP;
    constructor(path: string, regExp: RegExp) { 
      this.path = path;
        this.regExp = regExp;
      this.myMvMethod = require('mv'); 
      this.fs = require('fs'); 
      this.FILENAME_REGEXP = regExp;
    }
	static getinstance(path: string, regExp: RegExp)  {
      if (FSUtil.myself == null) {
        FSUtil.myself = new FSUtil(path, regExp);
      }
      return FSUtil.myself;
    }
	// console.log('path string : "' + pathStr + '"');
	getFilesName() {
		// console.log('regExp : "' + this.FILENAME_REGEXP + '"');
		var myArray = this.fs.readdirSync(this.path);
		var retArray = [];
		for ( var i = 0; i < myArray.length; i++) {
			var elem = myArray[i];
			var epochDate = this.filter(this.FILENAME_REGEXP, elem);
			if (epochDate) {
				retArray.push(elem);
			}
		}

		return retArray.sort();
	}

	filter(regExp, nArq) {
		// console.log('filter : ' + regExp + ' - ' + nArq);
		if (this.regExp == undefined) {
			return false;
		}
		if (this.regExp.test(nArq)) {
			var myArray = regExp.exec(nArq);
			return myArray[1]; // A variavel que guarda o Epoch
		} else {
			return false;
		}
	}

	mv(source, destination) {
		console.log('movendo ' + source + '  >>> ' + destination);
		// console.log(myMvMethod);
		this.myMvMethod(source, destination, function(err) {
			if (err != undefined) {
				console.log('%s'.red.bold, err);
			}
		});
	}

	processInFile(nArq) {
		var msg = 'arquivo : ' + nArq + ' movido para diretorio tmp';
		// movendo os arquivos
		this.mv('./in/' + nArq, './tmp/' + nArq);
		console.log(msg);
	}

	callbackIn(e, i) {
		var epochDate = this.filter(this.FILENAME_REGEXP, e);
		if (epochDate) {
			var myDate = new Date(epochDate * 1000);
			var dateStr = myDate.toLocaleString();
			console.log('[' + i + '] : ' + 'Processando o arquivo relativo a ['
					+ dateStr + ']');

			this.processInFile(e);
		}
	}

	// fs.writeFileSync(fileName, str, 'utf8');

	processIn() {
		var fileNames = this.getFilesName();
		if (fileNames.length > 0) {
			// processo apenas o primeiro da lista
			this.callbackIn(fileNames[0], 0);
			return [ fileNames[0], (fileNames[0].split('.'))[0] + '.out' ];
		}
        // TODO: verificar se devo retornar [] nestas situações.
		return [];
	}

	write(fileName, msg) {
		// arquivo pode ser novo ou já existir
		// Se já existir limpa e atualiza com o novo valor
		this.fs.writeFileSync(fileName, msg); // encoding utf-8
		console.log('msg = ' + msg + ' foi salva em ' + fileName);
	}
}

export function fsUtil(path: string, regExp: RegExp) {
    return FSUtil.getinstance(path, regExp);
};
