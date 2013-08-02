var FSUtil = (function () {
    function FSUtil(path, regExp) {
        this.path = path;
        this.regExp = regExp;
        this.myMvMethod = require('mv');
        this.fs = require('fs');
        this.FILENAME_REGEXP = regExp;
    }
    FSUtil.myself = null;
    FSUtil.getinstance = function getinstance(path, regExp) {
        if(FSUtil.myself == null) {
            FSUtil.myself = new FSUtil(path, regExp);
        }
        return FSUtil.myself;
    };
    FSUtil.prototype.getFilesName = function () {
        var myArray = this.fs.readdirSync(this.path);
        var retArray = [];
        for(var i = 0; i < myArray.length; i++) {
            var elem = myArray[i];
            var epochDate = this.filter(this.FILENAME_REGEXP, elem);
            if(epochDate) {
                retArray.push(elem);
            }
        }
        return retArray.sort();
    };
    FSUtil.prototype.filter = function (regExp, nArq) {
        if(this.regExp == undefined) {
            return false;
        }
        if(this.regExp.test(nArq)) {
            var myArray = regExp.exec(nArq);
            return myArray[1];
        } else {
            return false;
        }
    };
    FSUtil.prototype.mv = function (source, destination) {
        console.log('movendo ' + source + '  >>> ' + destination);
        this.myMvMethod(source, destination, function (err) {
            if(err != undefined) {
                console.log('%s'.red.bold, err);
            }
        });
    };
    FSUtil.prototype.processInFile = function (nArq) {
        var msg = 'arquivo : ' + nArq + ' movido para diretorio tmp';
        this.mv('./in/' + nArq, './tmp/' + nArq);
        console.log(msg);
    };
    FSUtil.prototype.callbackIn = function (e, i) {
        var epochDate = this.filter(this.FILENAME_REGEXP, e);
        if(epochDate) {
            var myDate = new Date(epochDate * 1000);
            var dateStr = myDate.toLocaleString();
            console.log('[' + i + '] : ' + 'Processando o arquivo relativo a [' + dateStr + ']');
            this.processInFile(e);
        }
    };
    FSUtil.prototype.processIn = function () {
        var fileNames = this.getFilesName();
        if(fileNames.length > 0) {
            this.callbackIn(fileNames[0], 0);
            return [
                fileNames[0], 
                (fileNames[0].split('.'))[0] + '.out'
            ];
        }
        return [];
    };
    FSUtil.prototype.write = function (fileName, msg) {
        this.fs.writeFileSync(fileName, msg);
        console.log('msg = ' + msg + ' foi salva em ' + fileName);
    };
    return FSUtil;
})();
function fsUtil(path, regExp) {
    return FSUtil.getinstance(path, regExp);
}
exports.fsUtil = fsUtil;
;
