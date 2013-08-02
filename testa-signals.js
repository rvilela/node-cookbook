var signals = [ /*
				 * { s : "SIGHUP", n : "1", d : "Term Hangup detected on
				 * controlling terminal or death of controlling process " },
				 */
{
	s : "SIGINT",
	n : "2",
	d : "Term Interrupt from keyboard "
},/*
	 * , { s : "SIGQUIT", n : "3", d : "Core Quit from keyboard " } { s :
	 * "SIGILL", n : "4", d : "Core Illegal Instruction " }, { s : "SIGABRT", n :
	 * "6", d : "Core Abort signal from abort(3) " }, { s : "SIGFPE", n : "8", d :
	 * "Core Floating point exception " },
	 */{
	s : "SIGKILL",
	n : "9",
	d : "Term Kill signal "
}, /*
	 * { s : "SIGSEGV", n : "11", d : "Core Invalid memory reference " }, { s :
	 * "SIGPIPE", n : "13", d : "Term Broken pipe: write to pipe with no readers " }, {
	 * s : "SIGALRM", n : "14", d : "Term Timer signal from alarm(2) " },
	 */{
	s : "SIGTERM",
	n : "15",
	d : "Term Termination signal "
}, /*
	 * { s : "SIGUSR1", n : "30,10,16", d : "Term User-defined signal 1 " }, { s :
	 * "SIGUSR2", n : "31,12,17", d : "Term User-defined signal 2 " }, { s :
	 * "SIGCHLD", n : "20,17,18", d : "Ign Child stopped or terminated " }, { s :
	 * "SIGCONT", n : "19,18,25", d : "Cont Continue if stopped " }, { s :
	 * "SIGSTOP", n : "17,19,23", d : "Stop Stop process " }, { s : "SIGTSTP", n :
	 * "18,20,24", d : "Stop Stop typed at tty " }, { s : "SIGTTIN", n :
	 * "21,21,26", d : "Stop tty input for background process " }, { s :
	 * "SIGTTOU", n : "22,22,27", d : "Stop tty output for background process " }
	 */];

var spawn = require('child_process').spawn;
var notepad = spawn('mathcadprime'/*
									 * , [ 't-' + (Math.random() * 5000) +
									 * '.mcdx' ]
									 */);

var index = 0;
var sendSignal = function() {
	console.log('signal: ' + signals[index].s + ' - ' + signals[index].n + ': '
			+ signals[index].d);
	notepad.kill(signals[index].s);
	index = index + 1;
	if (index >= signals.length) {
		return;
	} else {
		notepad = spawn('mathcadprime'/*
										 * , [ 't-' + ((Math.random() + 1) *
										 * 5000) + '.mcdx' ]
										 */);
		setTimeout(writeStdin, 10000);
		setTimeout(sendSignal, 20000);
	}
};

var writeStdin = function() {
	notepad.stdin.write('\u0010');
};

setTimeout(writeStdin, 10000);
setTimeout(sendSignal, 20000);
