#!/usr/bin/env node
var colors = require('colors');
var prompt = require('./prompt');
var templateWriter = require('./template-writer');

console.log('---------------------------------------------------------------\n'.rainbow);
console.log('Hello Human\n');
console.log('I\'d like to help you get started with your electron app\n');
console.log('First, I\'ll ask you a few questions');
console.log('And then I\'ll create a template that suits your needs\n');

prompt.promptForSetup(function(result){

  templateWriter.copyTempateWithResult(result, function(){
    console.log('Your electron app is ready to go!\n');
    console.log('To boostrap your application run \'script\/bootstrap\'\n');
    console.log('Good luck!\n');
    console.log('---------------------------------------------------------------\n'.rainbow);
  });
});
