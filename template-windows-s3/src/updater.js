if (process.platform === 'win32') {
  var config = require('../config.json')
  var updator = require('autoUpdater')
  updator.setFeedUrl(config.windowsUpdateUrl)
  updator.checkForUpdates()
}
