
'use strict';

/**
 * Dependencies
 */
var args = require('yargs').argv;

/**
 * Expose configuration
 * @type {Object}
 */
module.exports = function createTask(gulp, config) {
  /**
   * Bump the version
   * --type=pre will bump the prerelease version *.*.*-x
   * --type=patch or no flag will bump the patch version *.*.x
   * --type=minor will bump the minor version *.x.*
   * --type=major will bump the major version x.*.*
   * --version=1.2.3 will bump to a specific version and ignore other flags
   */
  gulp.task('bump', function() {
    var msg = 'Bumping versions'
      , type = args.type || 'patch'
      , version = args.ver
      , options = {};

    if (version) {
      options.version = version;
      msg += ' to ' + version;
    } else {
      options.type = type;
      msg += ' for a ' + type;
    }
    gulp.log(msg);

    return gulp
      .src(config || ['package.json'])
      .pipe(gulp.plugins.print())
      .pipe(gulp.plugins.bump(options))
      .pipe(gulp.dest(gulp.paths.root));
  });
};
