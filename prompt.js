'use strict'

var AcceleratorPrompt, prompt, confirm, colors, schema,
    confirmSchema, promptForInput;

prompt = require('prompt');
confirm = require('prompt');
colors = require('colors');

schema = {
  properties: {

    authorsName:{
      description: 'What is your name',
      type: 'string',
      required: true
    },

    applicationName:{
      description: 'What is your application\'s name',
      pattern: /^\w+$/,
      type: 'string',
      required: true,
      message: 'Application name must not have spaces'.red
    },

    applicationDescription:{
      description: 'Application Description',
      type: 'string',
    },

    applicationRepository:{
      description: 'Repository Url',
      type: 'string',
    },

    platform:{
      description: 'Which platform will your app run on?' + ' all, win32, darwin or linux'.gray,
      type: 'string',
      conform: function (value) {
        var x = value.trim();
        return x === 'all' || x === 'win32' || x === 'darwin' || x === 'linux';
      },
      required: true,
      message: 'Must be one of the following: all, win32, darwin or linux'.red
    },

    architecture:{
      description: 'Which architecture will your app run on?' + ' all, ia32 or x64'.grey,
      type: 'string',
      conform: function (value) {
        var x = value.trim();
        return x === 'all' || x === 'ia32' || x === 'x64';
      },
      required: true,
      message: 'Must be one of the following: all, ia32 or x64'.red
    },

  }
};

confirmSchema = {
  properties: {
    yes:{
      description: 'Confirm'+ ' (Yes)'.gray,
      type: 'string',
      required: true
    }
  }
};

AcceleratorPrompt = function(){}

promptForInput = function(done){

  prompt.get(schema, function (err, result) {

    if(err){
      throw err;
    }
    
    console.log('');
    console.log('Ok, human. How does this look?\n');

    for (var key in result) {
    if (result.hasOwnProperty(key)) {
       console.log(key + ': ' + result[key]);
      }
    }

    console.log('');

    prompt.get(confirmSchema, function(error, confirm){
      if(confirm.yes.trim().toLowerCase() == 'yes'){
        console.log('All right, your template is comming right up.\n');
        done(result);
      }
    });
  });
}

AcceleratorPrompt.prototype.promptForSetup = function(done){
  prompt.start();
  confirm.start();

  prompt.message = "";
  prompt.delimiter = " ";

  promptForInput(done);
}

module.exports = new AcceleratorPrompt();
