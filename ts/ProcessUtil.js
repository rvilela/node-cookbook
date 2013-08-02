var ProcessUtil = (function () {
    function ProcessUtil() { }
    ProcessUtil.prototype.start = function (processName, programName) {
        this.processName = processName;
        this.programName = programName;
        var spawn = require('child_process').spawn;
        var logUtil = require('./LogUtil.js');
        console.log('this.child =  ' + this.child + ', this.processName = ' + this.processName + ', this.programName = ' + this.programName + ' ');
        if(this.child != null) {
            throw new Error('Invalid State Exception: dois ou mais starts seguidos'.red.bold);
        }
        console.log('Iniciando Processo');
        this.child = spawn(this.processName, [
            programName
        ]);
        return this;
    };
    ProcessUtil.prototype.log = function () {
        console.log('Pid do Processo ' + this.processName.blue.bold + ' : ' + this.child.pid);
    };
    ProcessUtil.prototype.stop = function () {
        this.child.kill('SIGTERM');
    };
    return ProcessUtil;
})();
;
function processUtil() {
    var myProcessUtil = new ProcessUtil();
    return myProcessUtil;
}
exports.processUtil = processUtil;
;
