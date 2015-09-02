'use strict'

var TemplateWriter, copy, fs, Mustache, applyTemplate,
    applyToTemplates, copyRawTemplate;

copy = require('directory-copy');
fs = require('fs')
Mustache = require('mustache');

TemplateWriter = function(){};

applyTemplate = function(file, settings){
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var rendered = Mustache.render(data, settings);
    fs.writeFile(file, rendered, function (err) {
      if (err) return console.log(err);
      return;
    });
  });
};

copyRawTemplate = function(done){
  console.log('Creating electron project structure')
  var options = { src: __dirname + '/template', dest: process.cwd()};
  copy(options, function(){
    done();
  })
  .on('log', function (msg, level) {
    if(level == 'warn' || level == 'error'){
      console.log(level + ': ' + msg)
    }
  });
};

applyToTemplates = function(settings){
  console.log('Applying custom configuration');
  var cwd, configFile, packageFile, readMeFile;

  cwd = process.cwd();
  configFile = cwd + '/config.json';
  packageFile = cwd + '/package.json';
  readMeFile = cwd + '/readme.md';

  applyTemplate(configFile, settings);
  applyTemplate(packageFile, settings);
  applyTemplate(readMeFile, settings);
}

TemplateWriter.prototype.copyTempateWithResult = function(settings, done){
  copyRawTemplate(function(){
      applyToTemplates(settings);
      done();
  })
}

module.exports = new TemplateWriter();
