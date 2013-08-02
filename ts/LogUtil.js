var Colors = require('colors');
var LogMessage = (function () {
    function LogMessage(c, v) {
        this.chave = (c || '').toString();
        this.valor = (v || '').toString();
    }
    LogMessage.prototype.toString = function () {
        var now = new Date();
        var ret = '' + (now.getFullYear() + ((now.getMonth() > 8) ? '' : '0') + (now.getMonth() + 1) + ((now.getDate() > 9) ? '' : '0') + now.getDate() + ':' + now.getHours() + '' + now.getMinutes() + now.getSeconds()).green + ' ' + this.chave.blue + ': ' + this.valor.red;
        return ret;
    };
    return LogMessage;
})();
;
function logMessage(chave, valor) {
    console.log((new LogMessage(chave, valor)).toString());
}
exports.logMessage = logMessage;
;
