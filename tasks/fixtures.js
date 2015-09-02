'use strict';

/**
 * Dependencies
 */
var request = require('request')
    , fs      = require('fs')
    , path    = require('path');

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  gulp.task('fixtures', function() {
    /**
     * Download all fictures into target directory
     */
    config.src.forEach(function(fixture) {
      request('http://' + config.host + ':' + config.port + fixture.uri, function (error, response, body) {
        if (error) {
          gulp.log('Unable to fetch fixture ' + fixture.name + ': ' + error.code, 'red');
        } else {
          /**
           * Remove script tags from fixture (this breaks Karma) and save
           */
          fs.writeFile(
              path.join(config.dir, fixture.file + '.html'),
              body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          );
        }
      });
    });
  });
};

