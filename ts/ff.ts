declare var require;

var log = require('./LogUtil.js');
var FSUtil = require('./FSUtil.js');
var ProcessUtil = require('./ProcessUtil.js');
var Colors = require('colors');

var colorStr = function(str: string, cor ?: string ): string  {
	var colorToSet = cor || Colors.blue;
	return colorToSet.apply(str.toString());
};

var ff: FF;

var processFF = function() {
    log.logMessage('chave', ['chave', 'com', 'valor']);
	// Verificar se existe arquivos a processar
	ff = new FF('rotor_fluencia.xmcd');

	var fsUtil = FSUtil.fsUtil('./in', FF.IN_FILENAME_FLUENCY_REGEXP);
	if (fsUtil.getFilesName().length > 0) {
		// Existindo : Processo
		console.log(colorStr('processando fluencia'));
		ff.fluency();
	} else {
		// Não existindo : espero 1 minuto e tento novamente
		console.log('Aguardando sinal para iniciar');
		setTimeout(processFF, 60000);
	}
};

class FF   {
	static IN_FILENAME_FATIGUE_REGEXP = /fad_([0-9]+).dat/;
	static IN_FILENAME_FLUENCY_REGEXP = /flu_([0-9]+).dat/;

    public mathcad: any;    
	public terminaMathcad: any;
    
    constructor(private programName: string) { }
    
	fluency() {
		// console.log('fluency com: "' + FF.IN_FILENAME_FLUENCY_REGEXP + '"');
		// var fsUtil = new FSUtil('./bkp', FF.IN_FILENAME_FLUENCY_REGEXP);
		// fsUtil.processBkp();
		var fsUtil = FSUtil.fsUtil('./in', FF.IN_FILENAME_FLUENCY_REGEXP);
		var filesName = fsUtil.processIn();
		var arqSaida = filesName[1];
		// 1. Script lê o diretorio ./tmp
		// 2. pega o nome do arquivo mais antigo
		// 3. coloca o nome do arquivo no arquivo controle.txt
		var arqEntrada = filesName[0];
		fsUtil = FSUtil.fsUtil('./');
		fsUtil.write('controle.txt', '"arquivo de entrada :" ' + arqEntrada
				+ ' "arquivo de saida:" ' + arqSaida);
		// 4. invoca o Mathcad que processa gerando a saida em ./out
		fsUtil = FSUtil.fsUtil('./tmp', FF.IN_FILENAME_FLUENCY_REGEXP);
		var terminaMathcad = function(): bool {
			var OUT_FILENAME_REGEXP = /[a-z]+_([0-9]+).out/;
			console.log('arqSaida: ' + arqSaida.red);
			var arqSaidaExiste = false;
			var isEqualTo = function(element, index, array) {
				console.log('element : "' + element.blue.bold + '" ');
				return (element == arqSaida);
			};
			// console.log('this : ' + typeof (this));
			var fsUtilOut = FSUtil.fsUtil('./out', OUT_FILENAME_REGEXP);
			// console.log('fsUtilOut.getFilesName() : "' +
			// fsUtilOut.getFilesName() + '" ');
			arqSaidaExiste = fsUtilOut.getFilesName().some(isEqualTo);
			if (arqSaidaExiste) {
				this.mathcad.stop();
				console.log('MathCad Terminado. Iniciando novo ciclo...'.blue);
				console.log('volto em 1 minuto'.blue);
				setTimeout(processFF, 60000);
			} else {
				setTimeout(terminaMathcad, 30000);
			}
            return false;
		};

		var processUtil = ProcessUtil.processUtil();
		this.mathcad = processUtil.start('mathcad', this.programName);
		console.log('Após início do Mathcad, testar se ' + arqEntrada + '.wf1');
		// Testar se foi gerado arqEntrada.wf1 pelo Mathcad 
			
		setTimeout(terminaMathcad, 30000);
	};

	fatigue() {
		console.log('fatigue com: "' + FF.IN_FILENAME_FATIGUE_REGEXP + '"');
	};
};

processFF();

console.log(colorStr('xxx', Colors.red));
