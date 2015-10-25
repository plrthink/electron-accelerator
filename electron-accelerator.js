'use strict'
var colors, argv, prompt, templateWriter, writeOpening, writeClosing, init;

colors = require('colors');
argv = require('yargs').argv;
prompt = require('./prompt');
templateWriter = require('./template-writer');

writeOpening = function(){
  console.log();
  console.log('---------------------------------------------------------------\n'.rainbow);
  console.log('Hello Human\n');
};

writeClosing = function(){
  console.log();
  console.log('Your electron app is ready to go!\n');
  console.log('To boostrap your application run \'script\/bootstrap\'');
  console.log('Be sure to check out your projects readme.md for more information\n');
  console.log('Good luck!\n');
  console.log('---------------------------------------------------------------\n'.rainbow);
};

init = function(yargs, callback){
  var options = {
    'directory' : yargs.argv['directory'],
    'platform' : yargs.argv['platform'],
    'architecture' : yargs.argv['architecture'],
    'application-name' : yargs.argv['application-name'],
    'authors-name' : yargs.argv['authors-name'],
    'application-description' : yargs.argv['application-description'],
    'repository-url' : yargs.argv['repository-url'],
    'debug' : yargs.argv['debug']
  }

  writeOpening();

  templateWriter.copyTempateWithResult(options, function(){
      writeClosing();
      callback(0);
  });

}

module.exports = function(yargs, callback){

  yargs.reset()
    .usage('\nUsage: $0 init -d [directory] -p [platform] -a [architecture]')
    .alias('d', 'directory')
    .alias('a', 'architecture')
    .alias('p', 'platform')
    .alias('h', 'help')

    .describe('d', 'execute in directory')
    .describe('p', 'build for')
    .describe('a', 'build as ')
    .describe('application-name', 'the application name')
    .describe('authors-name', 'application author')
    .describe('application-description', 'a short description')
    .describe('repository-url', 'a git url')
    .describe('debug', 'debug output')

    // choices
    .choices('p', ['all', 'darwin', 'win32', 'linux'])
    .choices('a', ['all', 'x64', 'ia32'])

    // types
    .string('d')
    .string('a')
    .string('p')
    .string('application-name')
    .string('authors-name')
    .string('application-description')
    .string('repository-url')
    .boolean('debug')

    // defaults
    .default('application-name','electron-accelerator')
    .default('authors-name','human')
    .default('application-description', '')
    .default('repository-url', '')
    .default('debug', false)

    // Required options
    .demand('d')
    .demand('platform')
    .demand('architecture')
    .help('h')
    .wrap(100)
    .argv

    init(yargs, callback);
};
