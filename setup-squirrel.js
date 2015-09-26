'use strict'

module.exports = function(yargs, callback){

  yargs.reset()
    .usage('\nUsage: $0 setup-squirrel windows')
    .command('windows', 'sets up squirrel releasess for windows');

  var argv = yargs.argv;
  var command = argv._[0];

  if(command === 'windows'){
    var setupWindows = require('./setup-squirrel-windows');
    setupWindows(yargs, function(code){
      console.log();// empty space to terminate after a new line
      process.exit(1)
    });
  }
}
