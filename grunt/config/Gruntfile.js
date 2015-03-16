var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  baseUrl: '../www',
  app: '<%= config.baseUrl %>/js/app',
  src: '<%= config.baseUrl %>/js/src',
  dist: '<%= config.baseUrl %>/js/dist'
}

module.exports = function(grunt) {
   // Project configuration.
    grunt.initConfig({
        config: config,
        pkg: config.pkg,
        bower: {
            install: {
                options: {
                    targetDir: '<%= config.app %>/libs',
                    install: true,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= config.baseUrl %>/js/app',
                    mainConfigFile: '<%= config.baseUrl %>/js/app/main.js',
                    name: 'bootstrap',
                    out: '<%= config.dist %>/app-built.js'
                }
            }
        },
        compass: {
            dev: {
                options: {
                  config: 'config.rb',
                  cssDir: '<%= config.baseUrl %>/css',
                  environment: 'development'
                }
            },
            prod: {
                options: {
                  config: 'config.rb',
                  cssDir: '<%= config.baseUrl %>/css/dist',
                  environment: 'production'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['../sass/*.scss'],
                tasks: ['compass']
            },
            scripts: {
                files: ['./www/js/'],
                tasks: ['requirejs:compile']
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 9001,
                    base: '../www',
                    open: {
                        target: 'http://localhost:9001'
                    }
                }
            }
        }
        // copy: {
        //   main: {
        //     files: [
        //       // includes files within path and its sub-directories
        //       {expand: true, cwd: './www/', src: ['img/**'], dest: 'src/'},
        //     ],
        //   },
        // },
        // imagemin: {
        //   options: {
        //     title: 'Build complete',  // optional
        //     message: ' build finished successfully.', //required
        //     cache: false
        //   },

        //   dist: {
        //     files: [{
        //       expand: true,
        //       cwd: './www/img',
        //       src: ['**/*.{png,jpg,gif}'],
        //       dest: 'dist/'
        //     }]
        //   }
        // }

    // CONFIG ===================================/

   });

    // DEPENDENT PLUGINS =========================/
    require('load-grunt-tasks')(grunt);

    // TASKS =====================================/
    grunt.registerTask('default', ['bower', 'compass', 'requirejs', 'connect', 'watch']);

};