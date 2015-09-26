'use strict'

var TemplateWriter, copy, fs, Mustache, applyTemplate,
    applyToTemplates, copyRawTemplate;

copy = require('directory-copy');
fs = require('fs')
Mustache = require('mustache');

TemplateWriter = function(){};

applyTemplate = function(file, settings){
  if(settings.debug){
    console.log('debug: Applying template to ' + file);
  }
  var data = fs.readFileSync(file, 'utf8');
  var rendered = Mustache.render(data, settings);

  if(settings.debug){
    console.log('debug: Rendered file  ' + file);
    console.log(rendered);
  }

  fs.writeFileSync(file, rendered);
};

copyRawTemplate = function(settings, done){
  console.log('Creating electron project structure')
  var options = { src: __dirname + '/template', dest: settings.directory};
  copy(options, function(){
    done();
  })
  .on('log', function (msg, level) {
  if(level == 'warn' || level == 'error' || (settings.debug && level == 'debug')){
      console.log(level + ': ' + msg)
    }
  });
};

applyToTemplates = function(settings){
  console.log('Applying custom configuration');
  var configFile, packageFile, readMeFile;

  configFile = settings.directory + '/config.json';
  packageFile = settings.directory + '/package.json';
  readMeFile = settings.directory + '/readme.md';

  if(settings.debug){
      console.log('debug: Settings to apply \n' + JSON.stringify(settings));
  }

  applyTemplate(configFile, settings);
  applyTemplate(packageFile, settings);
  applyTemplate(readMeFile, settings);
}

TemplateWriter.prototype.copyTempateWithResult = function(settings, done){
  copyRawTemplate(settings, function(){
      applyToTemplates(settings);
      done();
  })
}

module.exports = new TemplateWriter();
