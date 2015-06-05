
'use strict';

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  /**
   * @type {Array}
   */
  var tasks = Object.keys(config).map(function(name) {
    return 'clean:' + name;
  })

  /**
   * Create the clean task
   */
  gulp.task('clean', tasks);

  /**
   * Create each seperate task
   */
  gulp.lodash.each(config, function(path, name) {
    gulp.task('clean:' + name, function(done) {
      gulp.log('Cleaning ' + name + ': ' + path);
      return gulp.src(path)
        .pipe(gulp.plugins.clean());
    });
  });
};
