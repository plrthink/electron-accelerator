'use strict'

var TemplateWriter, copy, fs, Mustache, applyTemplate,
    applyToTemplates, copyRawTemplate;

copy = require('directory-copy');
fs = require('fs')
Mustache = require('mustache');

TemplateWriter = function(){};

applyTemplate = function(file, settings, done){
  console.log('Applying settings to '+ file + '....');
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);

    var rendered = Mustache.render(data, settings);
    fs.writeFile(file, rendered, function (err) {
      if (err) return console.log(err);
      return;
    });
  });
}

copyRawTemplate = function(done){
  console.log('Initalising electron project structure')
  var options = { src: __dirname + '/template', dest: process.cwd()};
  copy(options, function(){
    console.log('Done');
    done();
  })
  .on('log', function (msg, level) {
    console.log(level + ':' + msg);
    if(level == 'warn' || level == 'error'){
      console.log(level + ': ' + msg)
    }
  });
};

applyToTemplates = function(settings){
  console.log('Applying custom configuration' + settings);
  var cwd, configFile, packageFile, readMeFile;

  cwd = process.cwd();
  configFile = cwd + '/config.json';
  packageFile = cwd + '/package.json';
  readMeFile = cwd + '/readme.md';

  applyTemplate(configFile, settings);
  applyTemplate(packageFile, settings);
  applyTemplate(readMeFile, settings);

  console.log('Done');
}

TemplateWriter.prototype.copyTempateWithResult = function(settings){
  copyRawTemplate(function(){
      applyToTemplates(settings);
  })
}

module.exports = new TemplateWriter();
