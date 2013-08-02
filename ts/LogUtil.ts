declare var require;

var Colors = require('colors');

class LogMessage {
    private chave: string;
    private valor : string;
    constructor(c: any, v ?: any) { 
      this.chave = (c || '').toString();
      this.valor = (v || '').toString();
    }
    toString() {
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

export function logMessage(chave, valor) {
    console.log((new LogMessage(chave, valor)).toString());
};   

   
