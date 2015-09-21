#!/usr/bin/env node
var argv = require('yargs').argv;
var accelerator = require('./electron-accelerator');

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init', 'initalise an electron project')
    .command('version', 'gets the version of electron-accelerator')
    .command('help', 'show help for the electron-accelerator')
    .example('$0 init', 'initalise an electron project in the current directory')
    .demand(1)
    .argv;

var command = argv._[0];

if (command === 'version') {
   var packageFile = require('./package.json');
   console.log(packageFile.name + '@' + packageFile.version);
   process.exit();
}

if (command === 'init') {
  accelerator(function(code){
    console.log();// empty space to terminate after a new line
    process.exit(1)
  });
}
