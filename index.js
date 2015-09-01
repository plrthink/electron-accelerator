var prompt = require('prompt');
var confirm = require('prompt');
var colors = require('colors');
var copy = require('directory-copy')

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
      , dest: __dirname + '/out'
      }
    , function () {
      console.log('done!')
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
