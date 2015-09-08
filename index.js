#!/usr/bin/env node
var colors = require('colors');
var argv = require('yargs').argv;
var accelerator = require('./electron-accelerator');

if (argv.version || argv.v) {
   var packageFile = require('./package.json');
   console.log(packageFile.name + '@' + packageFile.version);
   process.exit();
}

accelerator(function(code){
  process.exit(code)
});
