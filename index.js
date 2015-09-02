#!/usr/bin/env node
var prompt = require('./prompt');
var templateWriter = require('./template-writer');

prompt.promptForSetup(function(result){
  templateWriter.copyTempateWithResult(result);
})
