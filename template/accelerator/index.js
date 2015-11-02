module.exports = function(grunt) {
  'use strict';

  var buildOptions = require('../config.json');

  grunt.option('buildOptions', buildOptions);

  grunt.initConfig({
    clean: {
      builds: [buildOptions.buildsDirectory]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadTasks('./accelerator/tasks');

  grunt.registerTask('default', ['build']);
};
