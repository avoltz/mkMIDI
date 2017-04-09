module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all : [ '*.js', 'widgets/*.js' ],
      options: {
        esversion: 6
      }
    },
    exec: {
      server: './ssl-server.sh'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['exec', 'server']);
};
