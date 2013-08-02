var sys = require('sys');
var sleep = require('sleep');
var spawn = require('child_process').spawn;
var par0 = process.argv[0];
var par1 = process.argv[1];
var execname = "mathcad";
var filename = "rotor_fluencia.xmcd";

var Processa = function() {
    console.log(execname + " / " + filename);
    console.log("processo iniciado");

//    console.log("ps -e");
//    var teste = spawn("ps", ["-e"])    

    sleep.sleep(1);  
    var processo = spawn(execname, [filename]);
	console.log('Pid do Processo: ' + processo.pid);


    sleep.sleep(15);  
    console.log("cscript");
    var vbs = spawn("cscript", ["Exit.vbs"]); 
	console.log('Pid do Processo: ' + vbs.pid);
};

Processa();

/*
tail.stdout.on("data", function (data) {
  sys.puts(data);
});
if (!filename)
  return sys.puts("Usage: node <server.js> <filename>");
*/