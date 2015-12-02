'use strict'

module.exports = function (yargs, callback) {
  var argv = yargs.reset()
    .usage('\nUsage: $0 setup-squirrel <command>')
    .command('windows-s3', 'sets up squirrel releasess for windows via s3')
    .command('windows-github', 'sets up squirrel releasess for windows via GitHub')
    .demand(2, 'please specify which kind of squirrel you would like to set up')
    .help('h')
    .alias('h', 'help')
    .argv

  var command = argv._[1]

  if (command === 'windows-s3') {
    var setupWindowsS3 = require('./setup-squirrel-windows-s3')
    setupWindowsS3(yargs, function (code) {
      console.log()
      process.exit(1)
    })
  } else if (command === 'windows-github') {
    console.log('Not yet supported')
    process.exit(1)
  } else {
    yargs.showHelp()
  }
}
