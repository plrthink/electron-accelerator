#!/usr/bin/env node

'use strict'
var argv, accelerator, setupSquirrel, yargs, command, packageFile, setupDarwinDistributable

argv = require('yargs').argv
accelerator = require('./electron-accelerator')
setupSquirrel = require('./setup-squirrel')

yargs = require('yargs')
.usage('\nUsage: $0 <command> [options]')
.command('init', 'initalise an electron project in a given directory')
.command('setup-squirrel', 'setup a project for releases with Squirrel')
.command('version', 'display the version of electron-accelerator')

argv = yargs.argv
command = argv._[0]

if (command === 'init') {
  accelerator(yargs, function (code) {
    console.log()// empty space to terminate after a new line
    process.exit(1)
  })
} else if (command === 'setup-squirrel') {
  setupSquirrel(yargs, function (code) {
    console.log()// empty space to terminate after a new line
    process.exit(1)
  })
} else if (command === 'setup-darwin-distributable') {
  setupDarwinDistributable = require('./setup-darwin-distributable')
  setupDarwinDistributable(yargs, function(code) {
    console.log()// empty space to terminate after a new line
    process.exit(1)
  })
} else if (command === 'version') {
  packageFile = require('./package.json')
  console.log(packageFile.name + '@' + packageFile.version)
  process.exit()
} else {
  yargs.showHelp()
}
