module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.registerTask('hello', function() {
    grunt.log.write('hello world')
  })

  grunt.registerTask('default', ['hello']);
};
