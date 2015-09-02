#!/usr/bin/env node
var prompt = require('prompt');
var confirm = require('prompt');
var colors = require('colors');
var copy = require('directory-copy');
var fs = require('fs')
var Mustache = require('mustache');

prompt.start();
confirm.start();

prompt.message = "";
prompt.delimiter = " ";

console.log('---------------------------------------------------------------\n'.rainbow);
console.log('Hello Human\n');
console.log('I\'d like to help you get started with your electron app\n');
console.log('First, I\'ll ask you a few questions');
console.log('And then create I\'ll create a template that suits your needs\n');
console.log('---------------------------------------------------------------\n'.rainbow);

var schema = {

    properties: {

      authorsName:{
        description: 'What is your name'.magenta,
        type: 'string',
        required: true
      },

      applicationName:{
        description: 'What is your application\'s name'.magenta,
        pattern: /^\w+$/,
        type: 'string',
        required: true,
        message: 'Application name must not have spaces'.red
      },

      platform:{
        description: 'Which platform will your app run on?'.magenta +' all, win32, darwin or linux'.gray,
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
      }
    }
};

var confirmSchema = {

    properties: {

      yes:{
        description: 'Confirm (Yes)'.magenta,
        type: 'string',
        required: true
      }
    }
};

function createTemplate(result){

  copy(
      { src: __dirname + '/template'
      , dest: process.cwd()
      }
    , function () {
      console.log('done!')

      var configFile = process.cwd() + '/config.json';
      var packageFile = process.cwd() + '/package.json';
      var readMeFile = process.cwd() + '/readme.md';

      fs.readFile(configFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var rendered = Mustache.render(data, result);

        fs.writeFile(configFile, rendered, function (err) {
          if (err) return console.log(err);

        });
      });

      fs.readFile(packageFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var rendered = Mustache.render(data, result);

        fs.writeFile(packageFile, rendered, function (err) {
          if (err) return console.log(err);

        });
      });

      fs.readFile(readMeFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var rendered = Mustache.render(data, result);

        fs.writeFile(readMeFile, rendered, function (err) {
          if (err) return console.log(err);

        });
      });

    })
    .on('log', function (msg, level) {
      // Level is debug, info, warn or error
      console.log(level + ': ' + msg)
    });

};

prompt.get(schema, function (err, result) {

  if(err){
    throw err;
  }

  console.log('---------------------------------------------------------------\n'.rainbow);
  console.log('Ok, human. How does this look?\n');

  console.log('Authors name: ' + result.authorsName);
  console.log('Application Name: ' + result.applicationName);
  console.log('Platform: ' + result.platform);
  console.log('Architecture: ' + result.architecture);

  prompt.get(confirmSchema, function(error, confirm){
    if(confirm.yes.trim().toLowerCase() == 'yes'){
      console.log('All right, your template is comming right up.\n');
      console.log('---------------------------------------------------------------\n'.rainbow);

      createTemplate(result);
    }
  });
});
