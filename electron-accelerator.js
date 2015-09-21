'use strict'
var colors, argv, prompt, templateWriter, writeOpening, writeClosing;

colors = require('colors');
argv = require('yargs').argv;
prompt = require('./prompt');
templateWriter = require('./template-writer');

writeOpening = function(){
  console.log();
  console.log('---------------------------------------------------------------\n'.rainbow);
  console.log('Hello Human\n');
  console.log('I\'d like to help you get started with your electron app\n');
  console.log('First, I\'ll ask you a few questions');
  console.log('And then I\'ll create a template that suits your needs\n');
};

writeClosing = function(){
  console.log();
  console.log('Your electron app is ready to go!\n');
  console.log('To boostrap your application run \'script\/bootstrap\'');
  console.log('Be sure to check out your projects readme.md for more information\n');
  console.log('Good luck!\n');
  console.log('---------------------------------------------------------------\n'.rainbow);
};

module.exports = function(yargs, callback){

  yargs.reset()
    .usage('\nUsage: $0 init -d [directory] -p [platform] -a [architecture]')
    .alias('d', 'directory')
    .describe('d', 'execute in directory')
    // Platform
    .alias('p', 'platform')
    .describe('p', 'build for')
    .choices('p', ['all', 'darwin', 'win32', 'linux'])
    // Architecture
    .alias('a', 'architecture')
    .describe('a', 'build as ')
    .choices('a', ['all', 'x64', 'ia32'])

    .describe('application-name', 'the application name')
    .describe('authors-name', 'application author')
    .describe('application-description', 'a short description')
    .describe('repository-url', 'a git url')

    // Windows releases
    .describe('setup-windows-releases', 'set up windows releases now')
    .boolean('setup-windows-releases')
    // Required options
    .demand('d')
    .demand('platform')
    .demand('architecture')
    .wrap(100)
    .argv

  writeOpening();

  prompt(function(err, result){
    if (err) return callback(1);
    templateWriter.copyTempateWithResult(result, function(){
      writeClosing();
      callback(0);
    });
  });
};
