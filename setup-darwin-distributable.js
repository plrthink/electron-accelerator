'use strict'

var fs, config, Mustache, applyTemplate, copyFile, settings, buildOptions, writeScriptsToPackageJson

fs = require('fs')
Mustache = require('mustache')
buildOptions = JSON.parse(fs.readFileSync('config.json', 'utf8'))
settings = { 'application-name': buildOptions.applicationName }

applyTemplate = function (file, settings) {
  if (settings.debug) {
    console.log('debug: Applying template to ' + file)
  }
  var data = fs.readFileSync(file, 'utf8')
  var rendered = Mustache.render(data, settings)

  if (settings.debug) {
    console.log('debug: Rendered file  ' + file)
    console.log(rendered)
  }

  fs.writeFileSync(file, rendered)
}

copyFile = function (source, target, cb) {
  var rd = fs.createReadStream(source)
  rd.on("error", function(err) {
    cb(err)
  })
  var wr = fs.createWriteStream(target)
  wr.on("error", function(err) {
    cb(err)
  })
  wr.on("close", function(ex) {
    cb(null)
  })
  rd.pipe(wr)
}

writeScriptsToPackageJson = function () {
  var packageFile, data, config, destDir

  packageFile = 'package.json'
  if (!fs.existsSync(packageFile)) {
    console.log('There was no package.json file in this directory.')
    process.exit(1)
  }

  data = fs.readFileSync(packageFile, 'utf8')
  config = JSON.parse(data)

  if (config) {
    destDir = buildOptions.releaseDirectory + '/darwin/' + buildOptions.applicationName + '-setup/'
    config.scripts['prepackage-darwin'] = 'npm run build'
    config.scripts['package-darwin'] = 'appdmg appdmg.json ' + destDir + buildOptions.applicationName + '.dmg'
    fs.writeFileSync(packageFile, JSON.stringify(config, null, 2))
  } else {
    console.log('There was no package.json file in this directory.')
    process.exit(1)
  }
}

module.exports = function (yargs) {
  yargs.reset()
    .usage('\nUsage: $0 setup-darwin-distributable')
    .help('h')
    .alias('h', 'help')
    .argv

  var appdmgTemplate = __dirname + '/template-darwin/appdmg.json'
  copyFile(appdmgTemplate, './appdmg.json', function(err) {
    if(!err) {

      applyTemplate('./appdmg.json', Object.assign({}, settings, { debug: yargs.argv['debug'] }))

      writeScriptsToPackageJson()

      console.log()
      process.exit(0)
    }
  })

}
