'use strict'

var AcceleratorPrompt, prompt, colors, schema, _, windowsSchema,
    confirmSchema, windowsSetup, promptForInput, confirmOutput, pretty, argv;

argv = require('yargs').argv;
prompt = require('prompt');
windowsSetup = require('prompt');
colors = require('colors');
_ = require('underscore');
pretty = require('js-object-pretty-print').pretty;

prompt.start();
prompt.message = "";
prompt.delimiter = " ";
prompt.override = argv;
windowsSetup.override = argv;

schema = {
  properties: {

    'authors-name':{
      description: 'What is your name'.magenta,
      type: 'string',
      required: true
    },

    'application-name':{
      description: 'What is your application\'s name'.magenta,
      pattern: /^\w+$/,
      type: 'string',
      required: true,
      message: 'Application name must not have spaces'.red
    },

    'application-description':{
      description: 'Description'.magenta,
      type: 'string',
    },

    'repository-url':{
      description: 'Repository Url'.magenta,
      type: 'string',
    },

    platform:{
      description: 'Which platform will your app run on?'.magenta + ' all, win32, darwin or linux'.gray,
      type: 'string',
      conform: function (value) {
        var x = value.trim();
        return x === 'all' || x === 'win32' || x === 'darwin' || x === 'linux';
      },
      required: true,
      message: 'Must be one of the following: all, win32, darwin or linux'.red
    },

    architecture:{
      description: 'Which architecture will your app run on?'.magenta + ' all, ia32 or x64'.grey,
      type: 'string',
      conform: function (value) {
        var x = value.trim();
        return x === 'all' || x === 'ia32' || x === 'x64';
      },
      required: true,
      message: 'Must be one of the following: all, ia32 or x64'.red
    },

    'setup-windows-releases':{
      description: 'Do you want to setup Windows releases'.magenta + ' yes or no'.gray,
      type: 'string',
      conform: function (value) {
        var x = value.toLowerCase().trim();
        return x === 'yes' || x === 'no';
      },
      required: true,
      message: 'Must be yes or no'.red
    }
  }
};

windowsSchema = {
  properties: {
    'squirrel-s3-bucket':{
      description: 'What is your Squirrel for Windows S3 bucket'.magenta,
      pattern: /^\w+$/,
      type: 'string',
      required: true,
      message: 'S3 bucket name must not have spaces'.red
    },
    'squirrel-s3-bucket-prefix':{
      description: 'What is your Squirrel for Windows S3 prefix'.magenta,
      pattern: /^\w+$/,
      type: 'string',
      required: true,
      message: 'Bucket prefix name must not have spaces'.red
    },
    'squirrel-windows-update-url':{
      description: 'What is your Squirrel for Windows update url'.magenta,
      pattern: /^\w+$/,
      type: 'string',
      required: true,
      message: 'Update url  must not have spaces'.red
    }
  }
};

confirmSchema = {
  properties: {
    yes:{
      description: 'Confirm'.magenta + ' (Yes)'.gray,
      type: 'string',
      required: true
    }
  }
};

AcceleratorPrompt = function(){}

confirmOutput = function(result, done){
  console.log('');
  console.log('Ok, human. How does this look?\n');

  console.log(pretty(result));
  console.log('');

  prompt.get(confirmSchema, function(error, confirm){
    if(confirm.yes.trim().toLowerCase() == 'yes'){
      console.log('All right, your template is comming right up.\n');
      done(result);
    }
  });
}

promptForInput = function(done){

  prompt.get(schema, function (err, result) {

    if(err){
      throw err;
    }

    if(result['setup-windows-releases'].toLowerCase() == 'yes'){
      //prompt for windows
      windowsSetup.get(windowsSchema, function(error, windowsResult){
            if(err){
              throw err;
            }
            confirmOutput(_.extend(result, windowsResult),done);
      });
    }else {
      confirmOutput(result,done);
    }
  });
}

AcceleratorPrompt.prototype.promptForSetup = function(done){
  promptForInput(done);
}

module.exports = new AcceleratorPrompt();
