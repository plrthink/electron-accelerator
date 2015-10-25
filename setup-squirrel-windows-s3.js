'use strict'

var fs = require('fs')

module.exports = function(yargs, callback){

  var args = yargs.reset()
    .usage('\nUsage: $0 setup-squirrel windows-s3 -d [directory] -b [bucket] -p [prefix] -u [update-url]')
    .alias('d', 'directory')
    .alias('b', 'bucket-name')
    .alias('p', 'bucket-prefix')
    .alias('u', 'update-url')

    .describe('d', 'the directory of a previously initalised electron-accelerator project')
    .describe('b', 'the s3 bucket that the windows build will be served from')
    .describe('p', 'the s3 bucket prefix that the windows build will be served from')
    .describe('u', 'the url to update from')

    // Types
    .string('b')
    .string('p')
    .string('u')

    // defaults
    .default('directory','.')

    // Required options
    .demand('directory')
    .demand('bucket-name')
    .demand('bucket-prefix')
    .demand('update-url')
    .wrap(100)
    .argv;

    var options = {
      'directory' : yargs.argv['directory'],
      's3BucketName' : yargs.argv['bucket-name'],
      's3PrefixName' : yargs.argv['bucket-prefix'],
      'windowsUpdateUrl' : yargs.argv['update-url'],
    }

    // read in the json file and replace any s3-nodes
    var configFile = options['directory'] + "/config.json";
    var data = fs.readFileSync(configFile, 'utf8');
    var config = JSON.parse(data);

    if(config){
      config.s3BucketName = options['s3BucketName'];
      config.s3PrefixName = options['s3PrefixName'];
      config.windowsUpdateUrl = options['windowsUpdateUrl'];
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    }else{
      console.log("No config.json file found at the provided location")
    }

}
