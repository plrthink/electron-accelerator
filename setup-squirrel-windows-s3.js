'use strict'

var fs, copy, colors, writeOpening, writeClosing, writeOptionsConfig, writeScriptsToPackageJson,
    writeDefaultUpdater, appendUpdater;

fs = require('fs');
copy = require('directory-copy');
colors = require('colors');

writeOpening = function(){
  console.log();
  console.log('---------------------------------------------------------------\n'.rainbow);
  console.log('Hello Human\n')
  console.log('One moment while I setup squirrel for windows\n');
};

writeClosing = function(){
  console.log();
  console.log('Your electron app is read to release to the windows world!\n');
  console.log('For more information on how to ship, checkout ship-to-windows.md (which is now in your project)');
  console.log('Good luck!\n');
  console.log('---------------------------------------------------------------\n'.rainbow);
};

writeOptionsConfig = function(options){
  var configFile = "config.json";
  if(!fs.existsSync(configFile)) {
    console.log("There was no config.json file in this directory.");
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
    console.log("There was no config.json file in this directory.");
    process.exit(1);
  }
}

writeScriptsToPackageJson = function(){
  var packageFile = "package.json";
  if(!fs.existsSync(packageFile)) {
    console.log("There was no package.json file in this directory.");
    process.exit(1);
  }

  var data = fs.readFileSync(packageFile, 'utf8');
  var config = JSON.parse(data);

  if(config){
    config.scripts['package-windows'] = 'grunt create-windows-distributable';
    config.scripts['release-windows'] = 'grunt release-windows-distributable';
    fs.writeFileSync(packageFile, JSON.stringify(config, null, 2));
  }else{
    console.log("There was no package.json file in this directory.");
    process.exit(1);
  }
}

writeDefaultUpdater = function(callback){
  var defaultUpdater = __dirname + '/template/src/updater.js'
  var srcUpdater =  './src/updater.js';
  fs.writeFileSync(srcUpdater, fs.readFileSync(defaultUpdater));
}

appendUpdater = function(){
  console.log('update called')
  var updaterJsFile = 'src/updater.js'
  if(!fs.existsSync(updaterJsFile)) {

    console.log(updaterJsFile + " did not exist");

    writeDefaultUpdater(appendUpdater)
  }

  var templateUpdater = __dirname + '/template-windows-s3/src/updater.js'
  var appendContents = fs.readFileSync(templateUpdater);
  console.log('calling append')
  fs.appendFileSync(updaterJsFile, appendContents);
}

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

    writeOpening()

    var options = {
      's3BucketName' : yargs.argv['bucket-name'],
      's3PrefixName' : yargs.argv['bucket-prefix'],
      'windowsUpdateUrl' : yargs.argv['update-url'],
    }

    // read in the json file and replace any s3-nodes
    writeOptionsConfig(options);
    writeScriptsToPackageJson();

    // copy additional tasks and scripts
    var taskDirectory =  '.';
    var templateDirectory = __dirname + '/template-windows-s3'

    console.log('Copying squirrel related activities....')

    var options = {
        src: templateDirectory,
        dest: taskDirectory,
        excludes : [/src\/updater.js/]
    };

    copy(options, function(){
      appendUpdater();
      writeClosing();
      callback();
    })
    .on('log', function (msg, level) {
    if(level == 'warn' || level == 'error'){
        console.log(level + ': ' + msg)
      }
    });
}
