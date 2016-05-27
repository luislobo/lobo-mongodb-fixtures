/**
 * Code Hinting
 *
 */
module.exports = function (grunt) {

  var jsHintOptions = {
    // http://jshint.com/docs/options
    options: {
      jshintrc: true
    },
    default: {
      src: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    },
    tests: {
      src: [
        'test/**/*.test.js'
      ]
    }
  };

  // try to use jshint-stylish if available
  try {
    jsHintOptions.options.reporter = require('jshint-stylish');
  } catch (e) {
    // don't add jshint-stylish option
  }

  grunt.config.set('jshint', jsHintOptions);

  grunt.loadNpmTasks('grunt-contrib-jshint');
};