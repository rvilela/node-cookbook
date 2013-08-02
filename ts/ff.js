var log = require('./LogUtil.js');
var FSUtil = require('./FSUtil.js');
var ProcessUtil = require('./ProcessUtil.js');
var Colors = require('colors');
var colorStr = function (str, cor) {
    var colorToSet = cor || Colors.blue;
    return colorToSet.apply(str.toString());
};
var ff;
var processFF = function () {
    log.logMessage('chave', [
        'chave', 
        'com', 
        'valor'
    ]);
    ff = new FF('rotor_fluencia.xmcd');
    var fsUtil = FSUtil.fsUtil('./in', FF.IN_FILENAME_FLUENCY_REGEXP);
    if(fsUtil.getFilesName().length > 0) {
        console.log(colorStr('processando fluencia'));
        ff.fluency();
    } else {
        console.log('Aguardando sinal para iniciar');
        setTimeout(processFF, 60000);
    }
};
var FF = (function () {
    function FF(programName) {
        this.programName = programName;
    }
    FF.IN_FILENAME_FATIGUE_REGEXP = /fad_([0-9]+).dat/;
    FF.IN_FILENAME_FLUENCY_REGEXP = /flu_([0-9]+).dat/;
    FF.prototype.fluency = function () {
        var fsUtil = FSUtil.fsUtil('./in', FF.IN_FILENAME_FLUENCY_REGEXP);
        var filesName = fsUtil.processIn();
        var arqSaida = filesName[1];
        var arqEntrada = filesName[0];
        fsUtil = FSUtil.fsUtil('./');
        fsUtil.write('controle.txt', '"arquivo de entrada :" ' + arqEntrada + ' "arquivo de saida:" ' + arqSaida);
        fsUtil = FSUtil.fsUtil('./tmp', FF.IN_FILENAME_FLUENCY_REGEXP);
        var terminaMathcad = function () {
            var OUT_FILENAME_REGEXP = /[a-z]+_([0-9]+).out/;
            console.log('arqSaida: ' + arqSaida.red);
            var arqSaidaExiste = false;
            var isEqualTo = function (element, index, array) {
                console.log('element : "' + element.blue.bold + '" ');
                return (element == arqSaida);
            };
            var fsUtilOut = FSUtil.fsUtil('./out', OUT_FILENAME_REGEXP);
            arqSaidaExiste = fsUtilOut.getFilesName().some(isEqualTo);
            if(arqSaidaExiste) {
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
        setTimeout(terminaMathcad, 30000);
    };
    FF.prototype.fatigue = function () {
        console.log('fatigue com: "' + FF.IN_FILENAME_FATIGUE_REGEXP + '"');
    };
    return FF;
})();
;
processFF();
console.log(colorStr('xxx', Colors.red));
