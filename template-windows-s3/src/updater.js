if (process.platform === 'win32') {

  var config = require('../config.json')
  var auto-updater = require('autoUpdater')
  updator.setFeedUrl(config.windowsUpdateUrl)
  updator.checkForUpdates()
}
