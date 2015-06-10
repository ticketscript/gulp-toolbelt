
'use strict';

/**
 * Dependencies
 */
var request = require('request')
  , async   = require('async')
  , fs      = require('fs');

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  /* Enforce the usage of an Auth Token */
  if (!config.authToken) {
    gulp.log('Please specify a valid Auth Token for PhraseApp', 'red');
    return;
  }

  /* Specify a base URL */
  if (!config.baseUrl) {
    config.baseUrl = 'https://phraseapp.com/api/v1/';
  }

  /* Expose the Gulp task */
  gulp.task('phrase', function(done) {
    gulp.log('Fetching locales from PhraseApp');

    /* Start the request */
    request.get({
      url:  config.baseUrl + 'locales',
      qs:   {auth_token: config.authToken},
      json: true
    }, function(err, res, body) {
      /* Check for errors */
      if (err) {
        gulp.log('Unable to retrieve locales from PhraseApp', 'red');
        return done();
      }

      /* @type {Array} */
      var tasks = [];
      gulp.lodash.forEach(body, function(locale) {
        tasks.push(function() {
          request({
            url:  config.baseUrl + 'locales/' + locale.name + '.' + config.type,
            qs:   {auth_token: config.authToken}
          }).pipe(fs.createWriteStream(config.dest + locale.code + config.extension));
        });
      });

      /* Call the tasks in parallel */
      async.parallel(tasks, done);
      gulp.log('Fetched locales from PhraseApp');
    });
  });
};
