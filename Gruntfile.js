module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all : [ '*.js', 'elements/*.js', 'elements/midi/*.js', 'lib/*.js' ],
      options: {
        esversion: 6
      }
    },
    exec: {
      webpack_editor: './node_modules/webpack/bin/webpack.js --config editor.webpack.config.js',
      watch_editor: './node_modules/webpack/bin/webpack.js -w --config editor.webpack.config.js',
      webpack_instrument: './node_modules/webpack/bin/webpack.js --config instrument.webpack.config.js',
      watch_instrument: './node_modules/webpack/bin/webpack.js -w --config instrument.webpack.config.js',
      server: './ssl-server.sh'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['exec:server']);
  grunt.registerTask('webpack', ['exec:webpack_editor', 'exec:webpack_instrument']);
};
