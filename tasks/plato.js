
'use strict';

/**
 * Dependencies
 */
var glob  = require('glob').sync
  , plato = require('plato')

/**
 * @param  {Object} gulp
 * @param  {Object} options
 */
module.exports = function runTask(gulp, config) {
  /**
   * @return {Stream}
   */
  gulp.task('plato', function(done) {

    gulp.log('Analyzing source with Plato');
    gulp.log('Browse to ' + config.dest + '/index.html to see Plato results');

    /* Inspect our code */
    plato.inspect(glob(config.src), config.dest, config.options, platoCallback);

    /**
     * @param  {Object} report
     * @return {void}
     */
    function platoCallback(report) {
      if (config.verbose) {
        gulp.log(plato.getOverviewReport(report).summary);
      }
      if (done) {
        done();
      }
    }
  });
};
