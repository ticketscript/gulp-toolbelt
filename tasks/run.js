
'use strict';

/**
 * @param  {Object} gulp
 * @param  {Object} options
 */
module.exports = function runTask(gulp, options) {
  /**
   * @return {Stream}
   */
  gulp.task('run', function() {
    gulp.plugins.nodemon(options);
  });
};
