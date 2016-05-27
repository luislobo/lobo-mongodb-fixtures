/**
 * Code Hinting
 *
 */
module.exports = function (grunt) {

  grunt.config.set('eslint', {
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
  });

  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-eslint');
};