var log = require('./LogUtil.js');
var FSUtil = require('./FSUtil.js');
var ProcessUtil = require('./ProcessUtil.js');
var Colors = require('colors');

var ff = {};

var processFF = function() {
	// Verificar se existe arquivos a processar
	ff = new FF();

	var fsUtil = new FSUtil('./in', ff.IN_FILENAME_FLUENCY_REGEXP);
	if (fsUtil.getFilesName().length > 0) {
		// Existindo : Processo
		console.log('processando fluencia');
		ff.fluency();
	} else {
		// Não existindo : espero 1 minuto e tento novamente
		console.log('volto em 1 minuto');
		setTimeout(processFF, 60000);
	}
};

var FF = function() {
	this.IN_FILENAME_FATIGUE_REGEXP = /fad_([0-9]+).dat/;
	this.IN_FILENAME_FLUENCY_REGEXP = /flu_([0-9]+).dat/;

	var mathcad = {};
	var terminaMathcad = {};

	this.fluency = function() {
		// console.log('fluency com: "' + this.IN_FILENAME_FLUENCY_REGEXP + '"');
		// var fsUtil = new FSUtil('./bkp', this.IN_FILENAME_FLUENCY_REGEXP);
		// fsUtil.processBkp();
		var fsUtil = new FSUtil('./in', this.IN_FILENAME_FLUENCY_REGEXP);
		var filesName = fsUtil.processIn();
		var arqSaida = filesName[1];
		// 1. Script lê o diretorio ./tmp
		// 2. pega o nome do arquivo mais antigo
		// 3. coloca o nome do arquivo no arquivo controle.txt
		var arqEntrada = filesName[0];
		fsUtil = new FSUtil('./');
		fsUtil.write('controle.txt', '"arquivo de entrada :" ' + arqEntrada
				+ ' "arquivo de saida:" ' + arqSaida);
		// 4. invoca o Mathcad que processa gerando a saida em ./out
		fsUtil = new FSUtil('./tmp', this.IN_FILENAME_FLUENCY_REGEXP);
		terminaMathcad = function() {
			var OUT_FILENAME_REGEXP = /[a-z]+_([0-9]+).out/;
			console.log('arqSaida: ' + arqSaida.red);
			var arqSaidaExiste = false;
			var isEqualTo = function(element, index, array) {
				console.log('element : "' + element.blue.bold + '" ');
				return (element == arqSaida);
			};
			// console.log('this : ' + typeof (this));
			var fsUtilOut = new FSUtil('./out', OUT_FILENAME_REGEXP);
			// console.log('fsUtilOut.getFilesName() : "' +
			// fsUtilOut.getFilesName() + '" ');
			arqSaidaExiste = fsUtilOut.getFilesName().some(isEqualTo);
			if (arqSaidaExiste) {
				mathcad.stop();
				console.log('MathCad Terminado. Iniciando novo ciclo...'.blue);
				console.log('volto em 1 minuto'.blue);
				setTimeout(processFF, 60000);
			} else {
				setTimeout(terminaMathcad, 5000);
			}
		};

		var processUtil = new ProcessUtil();
		var programName = 'Rotor_Fluencia.xmcd';
		mathcad = processUtil.start('mathcad', programName);

		setTimeout(terminaMathcad, 5000);
	};

	this.fatigue = function() {
		console.log('fatigue com: "' + this.IN_FILENAME_FATIGUE_REGEXP + '"');
	};
};

var Colors = require('colors');
var colorStr = function(str, cor) {
	var colorToSet = cor || Colors.blue;
	return colorToSet.apply(str.toString());
};

String.prototype.toColorStr = function() {
	
};
console.log(colorStr('xxx'));
console.log(colorStr('xxx', Colors.red));

processFF();
