declare var require;

class ProcessUtil  {
	
	private child: any;
    private processName: string;
    private programName: string;
                                                                          
	start(processName, programName) {
        this.processName = processName;
        this.programName = programName;
        var spawn = require('child_process').spawn;
        var logUtil = require('./LogUtil.js');
        console.log('this.child =  ' + this.child + ', this.processName = ' 
                    + this.processName + ', this.programName = ' + this.programName + ' ' );
		if (this.child != null) {
			throw new Error(
					'Invalid State Exception: dois ou mais starts seguidos'.red.bold);
		}

		console.log('Iniciando Processo');
		this.child = spawn(this.processName, [ programName ]);

		return this;
	};
    
    log() {
		console.log('Pid do Processo ' + this.processName.blue.bold + ' : ' + this.child.pid);
    };

	stop() {
		this.child.kill('SIGTERM');
	};
};


export function processUtil() {
    var myProcessUtil = new ProcessUtil();
    return myProcessUtil;
};

// var processUtil = new ProcessUtil();
// var notepad = processUtil.start('notepad');
// var terminaNotepad = function() {
// notepad.stop();
// };
// setTimeout(terminaNotepad, 5000);
//
