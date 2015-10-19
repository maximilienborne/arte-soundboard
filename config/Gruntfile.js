var pkgjson = require('./package.json');

module.exports = function(grunt) {

    var config = {
        pkg: pkgjson,
        baseUrl: '../www',
        app: '<%= config.baseUrl %>/js/app',
        src: '<%= config.baseUrl %>/js/src',
        dist: '<%= config.baseUrl %>/js/dist',
        server: grunt.file.readJSON('server.json')
    };

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
                    name: 'main',
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
                    cssDir: '<%= config.baseUrl %>/css',
                    environment: 'production'
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            compass: {
                files: ['../sass/**/*.scss'],
                tasks: ['compass:dev', 'bsReload:all']
            }
        },
        browserSync: {
            dev: {
                options: {
                    proxy: config.server.base_url + '/' + config.server.path,
                    watchTask: true,
                    notify: true,
                    open: true,
                    port: 4000,
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                },
                bsFiles: {
                    src : [
                        '<%= config.baseUrl %>/css/**/*',
                        '<%= config.baseUrl %>/js/**/*',
                        '<%= config.baseUrl %>/templates/**/*',
                        '<%= config.baseUrl %>/index.html'
                    ]
                },
            }
        },
        bsReload: {
            all: {
                reload: true
            }
        },
        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.baseUrl %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= config.baseUrl %>/img'
                }]
            }
        },
        svgmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.baseUrl %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= config.baseUrl %>/img'
                }]
            }
        }

        // connect: {
        //     server: {
        //         options: {
        //             livereload: true,
        //             port: 9001,
        //             base: '../www',
        //             open: {
        //                 target: 'http://localhost:9001'
        //             }
        //         }
        //     }
        // },
        // copy: {
        //     main: {
        //         files: [
        //             // includes files within path and its sub-directories
        //             {expand: true, cwd: './www/', src: ['img/**'], dest: 'src/'},
        //         ],
        //   },
        // },
        // dist: {
        //     files: [{
        //         expand: true,
        //         cwd: './www/img',
        //         src: ['**/*.{png,jpg,gif}'],
        //         dest: 'dist/'
        //     }]
        //   }
        // }

    // CONFIG ===================================/

   });

    // DEPENDENT PLUGINS =========================/
    require('load-grunt-tasks')(grunt);

    // TASKS =====================================/
    grunt.registerTask('default', ['bower', 'compass:dev']);
    grunt.registerTask('serve', ['compass:dev', 'browserSync', 'watch']);
    grunt.registerTask('build', ['imagemin:prod', 'svgmin:prod', 'compass:prod', 'requirejs']);

};