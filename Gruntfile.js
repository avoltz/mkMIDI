module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all : [ '*.js' ],
      options: {
        esversion: 6
      }
    },
    exec: {
      server: 'http-server'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['exec', 'server']);
};
