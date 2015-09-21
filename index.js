#!/usr/bin/env node
var argv = require('yargs').argv;
var accelerator = require('./electron-accelerator');

var yargs = require('yargs')
  .usage('\nUsage: $0 <command> [options]')
  .command('init', 'initalise an electron project in a given directory')
  .command('version', 'display the version of electron-accelerator')
  .command('help', 'display help for electron-accelerator')
  .help('h')
  .alias('h', 'help')
  .demand(1, 'must provide a valid command'),
  argv = yargs.argv,
  command = argv._[0];

if (command === 'init') {
    accelerator(yargs, function(code){
      console.log();// empty space to terminate after a new line
      process.exit(1)
    });

} else if (command === 'version'){

  var packageFile = require('./package.json');
  console.log(packageFile.name + '@' + packageFile.version);
  process.exit();

}
else {
  yargs.showHelp();
}
