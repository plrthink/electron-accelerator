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
  grunt.loadTasks('./tasks');

  //basic tasks
  grunt.registerTask('build', [ 'clean', 'buildPackages']);
  grunt.registerTask('debug', ['debug-app']);

  //additional tasks

  // default task
  grunt.registerTask('default', ['build']);
};
