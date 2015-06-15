
'use strict';

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  /**
   * vet the code and create coverage report
   * @return {Stream}
   */
  gulp.task('vet', function() {
    gulp.log('Analyzing source with JSHint and JSCS');
    return gulp
      .src(config.src)
      .pipe(gulp.plugins.if(config.verbose, gulp.plugins.print()))
      .pipe(gulp.plugins.jshint())
      .pipe(gulp.plugins.jshint.reporter('jshint-stylish', {verbose: config.verbose}))
      .pipe(gulp.plugins.jshint.reporter('fail'))
      .pipe(gulp.plugins.jscs());
  });
};
