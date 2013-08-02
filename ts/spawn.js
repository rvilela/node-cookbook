var sys = require('sys');


var spawn = require('child_process').spawn;
var filename = process.argv[2];

var Processa = function() {
if (!filename)
  return sys.puts("Usage: node <spawn.js> <filename>");
    
console.log(filename);
    
var tail = spawn("cat", [filename]);
sys.puts("start cat");
};

Processa();
/*
tail.stdout.on("data", function (data) {
  sys.puts(data);
});
*/