'use strict'

var fs = require('fs');
var copy = require('directory-copy');

module.exports = function(yargs, callback){

  var args = yargs.reset()
    .usage('\nUsage: $0 setup-squirrel windows-s3 -b [bucket] -p [prefix] -u [update-url]')
    .alias('b', 'bucket-name')
    .alias('p', 'bucket-prefix')
    .alias('u', 'update-url')

    .describe('b', 'the s3 bucket that the windows build will be served from')
    .describe('p', 'the s3 bucket prefix that the windows build will be served from')
    .describe('u', 'the url to update from')

    // Types
    .string('b')
    .string('p')
    .string('u')

    // Required options
    .demand('bucket-name')
    .demand('bucket-prefix')
    .demand('update-url')
    .wrap(100)
    .argv;

    var options = {
      's3BucketName' : yargs.argv['bucket-name'],
      's3PrefixName' : yargs.argv['bucket-prefix'],
      'windowsUpdateUrl' : yargs.argv['update-url'],
    }

    // read in the json file and replace any s3-nodes
    var configFile = "config.json";

    if(!fs.existsSync(configFile)) {
      console.log("There was no config.json file in this directory.#");
      process.exit(1);
    }

    var data = fs.readFileSync(configFile, 'utf8');
    var config = JSON.parse(data);

    if(config){
      config.s3BucketName = options['s3BucketName'];
      config.s3PrefixName = options['s3PrefixName'];
      config.windowsUpdateUrl = options['windowsUpdateUrl'];
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    }else{
      console.log("There was no config.json file in this directory.!");
      process.exit(1);
    }

    // copy additional tasks and scripts
    var taskDirectory =  './accelerator/tasks';
    var templateDirectory = __dirname + '/template-windows-s3/accelerator/tasks'

    console.log('Adding squirrel tasks')

    var options = { src: templateDirectory, dest: taskDirectory};
    copy(options, function(){
      callback();
    })
    .on('log', function (msg, level) {
    if(level == 'warn' || level == 'error'){
        console.log(level + ': ' + msg)
      }
    });

}
