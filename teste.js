var process = require('Process');
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
