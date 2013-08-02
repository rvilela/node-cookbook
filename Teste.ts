// print process.argv
declare function require(name:string);

var process = require('Process');

process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
