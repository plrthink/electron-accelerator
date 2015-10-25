'use strict'

module.exports = function(yargs, callback){
  yargs.reset()
    .usage('\nUsage: $0 setup-squirrel windows-s3 -b [bucket] -p [prefix] -u [update-url]')
    .alias('b', 'squirrel-s3-bucket')
    .alias('p', 'squirrel-s3-bucket-prefix')
    .alias('u', 'squirrel-windows-update-url')

    .describe('b', 'the s3 bucket that the windows build will be served from')
    .describe('p', 'the s3 bucket prefix that the windows build will be served from')
    .describe('u', 'the url to update from')

    // types
    .string('b')
    .string('p')
    .string('u')

    // Required options
    .demand('squirrel-s3-bucket')
    .demand('squirrel-s3-bucket-prefix')
    .demand('squirrel-windows-update-url')
    .wrap(100)
    .argv
}
