
'use strict';

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  /**
   * Compile SASS to css
   * @return {Stream}
   */
  gulp.task('styles', function() {
    gulp.log('Compiling styles');

    /* @type {Stream} */
    var stream = gulp
      .src(config.src)
      .pipe(gulp.plumber());

    /** Initialize sourcemaps */
    if (config.sourcemaps) {
      stream = stream.pipe(gulp.plugins.sourcemaps.init())
    }

    /** Execute flow */
    stream = stream
      .pipe(gulp.plugins.sass.sync(config.options))
      .pipe(gulp.plugins.autoprefixer({
        browsers: config.prefix
      }))
      .pipe(gulp.plugins.rename(config.filename));

    /** Write sourcemaps */
    if (config.sourcemaps) {
      stream = stream.pipe(gulp.plugins.sourcemaps.write('.'));
    }

    /* @return {Stream} */
    return stream
      .pipe(gulp.dest(config.dest))
      .pipe(gulp.plugins.livereload());
  });
};
