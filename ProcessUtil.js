var ProcessUtil = function() {
	var spawn = require('child_process').spawn;
	this.child = 'undefined';
	this.start = function(processName) {
		if (this.child != 'undefined') {
			throw new Error(
					'Invalid State Exception: dois ou mais starts seguidos');
		}

		this.child = spawn(processName, [ 'controle.txt' ]);

		this.log = function() {
			console.log('Pid do Processo ' + processName + ' : ' + child.pid);
		};

		return this;
	};

	this.stop = function() {
		this.child.kill('SIGTERM');
	};
};

module.exports = ProcessUtil;

// var processUtil = new ProcessUtil();
// var notepad = processUtil.start('notepad');
// var terminaNotepad = function() {
// notepad.stop();
// };
// setTimeout(terminaNotepad, 5000);
//
