
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
  gulp.task('mocha', function(done) {
    gulp.log('Running tests with Mocha');
    return gulp
      .src(config.src)
      .pipe(gulp.plumber())
      .pipe(gulp.plugins.istanbul(config.istanbul))
      .pipe(gulp.plugins.istanbul.hookRequire())
      .on('finish', function() {
        gulp
          .src(config.tests)
          .pipe(gulp.plugins.mocha(config.mochaOptions))
          .pipe(gulp.plugins.istanbul.writeReports(config.istanbulReports))
          //.pipe(gulp.plugins.istanbul.enforceThresholds(config.istanbulEnforcer));
      });
  });
};
