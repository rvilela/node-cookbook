var sleep = require('sleep');
var spawn = require('child_process').spawn;
child = 'undefined';

for ( var i = 1 ; i < 10; i++) {
	child = spawn('cepel.soma.perf_counter.exe', ['MathCadCalls', i]);
	console.log('Pid do Processo: ' + child.pid + ' ' + i);

    sleep.sleep(1);  
	child.kill('SIGTERM');
}

/*
 * 
 * var FSUtil = require('./FSUtil.js'); var ProcessUtil =
 * require('./ProcessUtil.js');
 * 
 * var processUtil = new ProcessUtil(); 
 * notepad = processUtil.start('notepad', 'xxx.txt');
 * 
var xxx = 'xxx';
var filename = ' ';	
	filename = xxx + i + '.txt';

    setTimeout((function() {
    	console.log('var = ' + i );
	}), 2000);

 * 
 */
// pid = processUtil.log();
