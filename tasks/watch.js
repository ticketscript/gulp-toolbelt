
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
    return 'watch:' + name;
  })

  /**
   * Create the watch task
   */
  gulp.task('watch', tasks);

  /**
   * Create each seperate task
   */
  gulp.lodash.each(config, function(options, name) {
    gulp.task('watch:' + name, function(done) {
      gulp.log('Watching ' + name + ': ' + options.src);
      gulp.watch(options.src, options.tasks);
    });
  });
};
