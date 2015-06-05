
'use strict';

/**
 * Dependencies
 */

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {

  /**
   * Concatenate JavaScript
   * @return {Stream}
   */
  gulp.task('scripts', function() {
    gulp.log('Compiling JavaScript');

    /* @type {Stream} */
    var stream = gulp
      .src(config.src)
      .pipe(gulp.plumber());

    /** Initialize sourcemaps */
    if (config.sourcemaps) {
      stream = stream.pipe(gulp.plugins.sourcemaps.init())
    }

    /** Execute flow */
    stream = stream.pipe(gulp.plugins.concat(config.filename));

    /** Write sourcemaps */
    if (config.sourcemaps) {
      stream = stream.pipe(gulp.plugins.sourcemaps.write('.'));
    }

    return stream
      .pipe(gulp.dest(config.dest))
      .pipe(gulp.plugins.livereload());
  });
};
