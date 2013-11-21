/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '0.0.1',
      banner: '// MarionetteBook, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Muted Solutions, LLC.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://www.wesley.local/backbone/marionette-book'
    },

    jshint: {
      src: ['Gruntfile.js', 'assets/js/apps/**/*.js', 'assets/js/entities/*.js', 'assets/js/app.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    },

    concat: {
      dist: {
        src: [
          "assets/js/vendor/json2.js",
          "assets/js/vendor/jquery.js",
          "assets/js/vendor/jquery-ui-1.10.3.js",
          "assets/js/vendor/underscore.js",
          "assets/js/vendor/backbone.js",
          "assets/js/vendor/backbone.picky.js",
          "assets/js/vendor/backbone.syphon.js",
          "assets/js/vendor/backbone.localstorage.js",
          "assets/js/vendor/backbone.marionette.js",
          "assets/js/vendor/spin.js",
          "assets/js/vendor/spin.jquery.js",

          "assets/js/app.js",
          "assets/js/entities/contact.js",
          "assets/js/apps/contacts/contacts_app.js",
          "assets/js/apps/contacts/list/list_controller.js",
          "assets/js/apps/contacts/list/list_view.js",
          "assets/js/apps/contacts/show/show_controller.js",
          "assets/js/apps/contacts/show/show_view.js",

          "assets/js/apps/**/*.js"
        ],
        dest: 'assets/js/build/app.js'
      }
    },

    //uglify: {
    //  options: {
    //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //  },
    //  dist: {
    //    files: {
    //      'assets/js/build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //    }
    //  }
    //},

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'assets/js/build/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    //min: {
    //  dist: {
    //    src: ['assets/js/build/app.js'],
    //    dest: 'assets/js/build/app.min.js'
    //  }
    //},

    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Default task.
  //grunt.registerTask('default', 'jshint concat uglify');
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};