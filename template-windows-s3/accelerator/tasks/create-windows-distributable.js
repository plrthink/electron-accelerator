module.exports = function (grunt) {
  'use strict'

  grunt.loadNpmTasks('grunt-electron-installer')

  grunt.registerTask('create-windows-distributable', 'Builds a distributable for Windows', function () {
    var buildOptions

    buildOptions = grunt.option('buildOptions')

    grunt.extendConfig({
      'create-windows-installer': {
        x64: {
          appDirectory: 'builds/' + buildOptions.applicationName + '-win32-x64',
          outputDirectory: buildOptions.releaseDirectory + '/win32/' + buildOptions.applicationName + '-setup',
          authors: buildOptions.authors,
          exe: buildOptions.applicationName + '.exe'
        }
      }
    })

    if (process.platform !== 'win32') {
      grunt.log.warn('Skipping creating win32 distributable because the current platform is not win32')
      return
    }

    if (buildOptions.platform === 'all' || buildOptions.platform === 'win32') {
      grunt.task.run('create-windows-installer:x64')
    }
  })
}
