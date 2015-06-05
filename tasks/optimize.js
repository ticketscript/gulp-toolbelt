
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
    return 'optimize:' + name;
  })

  /**
   * Create the optimize task
   */
  gulp.task('optimize', tasks);

  /**
   * Create each seperate task
   */
  gulp.lodash.each(config, function(options, name) {
    gulp.task('optimize:' + name, function(done) {
      return gulp.src(options.src)
        .pipe(gulp.plugins[options.plugin](options.options || {}))
        .pipe(gulp.plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(options.dest));
    });
  });
};
