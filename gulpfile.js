
'use strict';

/**
 * Dependencies
 */
var args = require('yargs').argv
  , gulp = require('gulp')
  , path = require('path')
  , root = process.cwd()
  , _ = gulp.lodash = require('lodash');

/**
 * Add gulp methods and helpers
 */
var $ = gulp.plugins = require('gulp-load-plugins')({
  lazy:   true,
  config: __dirname + '/package.json',
  scope:  ['dependencies']
});

/**
 * Set proper paths for Gulp
 */
gulp.paths = {
  root:   root,
  dist:   root + '/dist/',
  views:  root + '/views/',
  client: root + '/client/',
  server: root + '/server/',
  test:   root + '/test/',
  report: root + '/report/',
  bower:  root + '/bower_components/',
  npm:    root + '/node_modules/'
};

/**
 * Small log functionality for our Gulp instance
 * @param  {Object|String}  msg
 * @param  {String}         color
 * @return {void}
 */
gulp.log = function logError(msg, color) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors[color || 'blue'](msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors[color || 'blue'](msg));
  }
}

/**
 * Catch errors and log them to the console
 * @return {Object}
 */
gulp.plumber = function createPlumber() {
  return $.plumber({
    errorHandler: function (err) {
      gulp.log(err, 'red');
      gulp.log('An error occured. Continuing...', 'red');
      this.emit('end');
    }
  });
};

/**
 * Load configuration
 * @type {Object}
 */
var config = {};
try {
  config = require(root + '/gulpfile.config')(gulp);
} catch (e) {
  gulp.log(e.message, 'red');
}

/**
 * Loop configuration to automatically load tasks 
 */
_.each(config, function(options, type) {
  try {
    require('./tasks/' + type)(gulp, options);
  } catch (e) {
    gulp.log(e.message, 'red');
  }
});

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Livereload task
 */
gulp.task('livereload', function() {
  $.livereload.listen(config.livereload || {
    port: 12345,
    host: '127.0.0.1',
    quiet: false
  });
});

/**
 * Expose `gulp`
 */
module.exports = gulp;
