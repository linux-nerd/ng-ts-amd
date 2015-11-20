module.exports = function (grunt) {
    "use strict";
    var fs = require("fs");
    var files = [];
    var list = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            if(fs.lstatSync(path + '/' +file).isDirectory())
                list(path + '/' +file);
            else
                files.push({name: file});
        });
    }

    grunt.initConfig({
        ts: {
            // use to override the default options, See: http://gruntjs.com/configuring-tasks#options
            // these are the default options to the typescript compiler for grunt-ts:
            // see `tsc --help` for a list of supported options.
            options: {
                compile: true,                 // perform compilation. [true (default) | false]
                comments: false,               // same as !removeComments. [true | false (default)]
                target: 'es5',                 // target javascript language. [es3 | es5 (grunt-ts default) | es6]
                module: 'amd',                 // target javascript module style. [amd (default) | commonjs]
                inlineSources: true,
                inlineSourceMap: true,
                //sourceMap: true,               // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
                //mapRoot: 'src/map',                   // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
                htmlModuleTemplate: 'My.Module.<%= filename %>',    // Template for module name for generated ts from html files [(default) '<%= filename %>']
                htmlVarTemplate: '<%= ext %>',                      // Template for variable name used in generated ts from html files [(default) '<%= ext %>]
                                                                    // Both html templates accept the ext and filename parameters.
                noImplicitAny: false,          // set to true to pass --noImplicitAny to the compiler. [true | false (default)]
                fast: "watch"                  // see https://github.com/TypeStrong/grunt-ts/blob/master/docs/fast.md ["watch" (default) | "always" | "never"]
                /* ,compiler: './node_modules/grunt-ts/customcompiler/tsc'  */ //will use the specified compiler.
            },
            // a particular target
            dev: {
                src: ["src/**/*.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                html: ['src/**/**.tpl.html'],  // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
                //reference: 'src/reference.ts', // If specified, generate this file that you can use for your reference management
                outDir: 'dist',             // If specified, generate an out.js file which is the merged js file
                //watch: 'src',                  // If specified, watches this directory for changes, and re-runs the current target
                // use to override the grunt-ts project options above for this target
                options: {
                    module: 'amd',
                    inlineSources: true,
                    inlineSourceMap: true,
                    declaration: true
                }
            },
            release: {
                src: ["src/**/*.ts"],
                outDir: 'release',
                options: {
                    module: "amd",
                }
            }
        },
        
        //task to copy html files to the target/release folder
        copy: {
            dist: {
                cwd: 'src',  // set working folder / root to copy
                src: ['**/*.html', '.htaccess'],      // copy all files and subfolders **with ending .html**
                dest: 'dist',    // destination folder
                expand: true,           // required when using cwd
                options: {
                    process: function(content, srcPath){
                        if(srcPath === 'src/.htaccess'){
                            return content.replace("src", "dist");
                        }else if(srcPath === 'src/index.html'){
                            return content.replace("/src/", "/dist/");
                        }else{
                            return content;
                        }
                    }
                }
            },
            definitelyTyped: {
                expand: true, 
                flatten: true, 
                src: 'dist/**/*.d.ts', 
                dest: 'typings/custom',
                filter: 'isFile'
            },
            release: {
                cwd: 'src',  // set working folder / root to copy
                src: ['**/*.html', '.htaccess'],      // copy all files and subfolders **with ending .html**
                dest: 'release',    // destination folder
                expand: true,           // required when using cwd
                options: {
                    process: function(content, srcPath){
                        if(srcPath === "src/index.html"){
                            content.replace("../bower_components/requirejs", "vendor/scripts");
                            return content.replace("/src/", "/release/");
                        }else if(srcPath === 'src/.htaccess'){
                            return content.replace("src", "release");;
                        }else{
                            return content;
                        }                     
                    }
                }
            }
        },

        //watch files
        watch: {
            dev: {
                files: ["src/**/*.ts", "src/**/*.html"],
                tasks: ["copy:dist", "ts:dev", "dts"]
                //tasks: ["ts:dev", "copyHtml", "concat", "clean:dev"]
            }
        },

        //uglify files
        uglify: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'release',
                    src: "**/*.js",
                    dest: "release"
                }]
            }
        },

        //clean the release folder
        clean: {
            release: ["release/**/*.js", "release/**/*.html"],
            dev: ['dist/**/*.d.ts']
        },

        //remove unwanted files and directories from the release folder
        remove: {
            options: {
                trace: true
            },
            release: {
                fileList: ['release/.baseDir.js'],
                dirList: ['release/unit-test']
            }
        },

        //copy vendor files from bower_components to vendors
        bowercopy: {
            scripts: {
                options: {
                    destPrefix: 'release/vendor/scripts'
                },
                files: {
                    "jquery.min.js": "jquery/jquery.min.js",
                    "require.js": "requirejs/require.js",
                    "bootstrap.min.js": "bootstrap/dist/js/bootstrap.min.js",
                    "angular.min.js": "angular/angular.min.js",
                    "angular-ui-router.min.js": "angular-ui-router/release/angular-ui-router.min.js",
                    "ocLazyLoad.min.js": "oclazyload/dist/ocLazyLoad.min.js"
                }
            },
            css: {
                options: {
                    destPrefix: "release/vendor/style/css"
                },
                files: {
                    "bootstrap.min.css": "bootstrap/dist/css/bootstrap.min.css"
                }
            },
            folders: {
                options: {
                    destPrefix: "release/vendor/style"
                },
                files:{
                    "fonts": "bootstrap/dist/fonts"
                }
            } 
        },

        //replace the text of index.html
        replace: {
            release: {
                src: ['release/requireConfig.js'],
                overwrite: true,
                replacements: [{
                    from: "../bower_components/jquery/jquery",
                    to: "vendor/scripts/jquery.min"
                }, {
                    from: "../bower_components/bootstrap/dist/js/bootstrap",
                    to: "vendor/scripts/bootstrap.min"
                }, {
                    from: "../bower_components/angular/angular",
                    to: "vendor/scripts/angular.min"
                }, {
                    from: "../bower_components/angular-ui-router/release/angular-ui-router",
                    to: "vendor/scripts/angular-ui-router.min"
                }, {
                    from: "../bower_components/oclazyload/dist/ocLazyLoad",
                    to: "vendor/scripts/ocLazyLoad.min"
                }]
            }
        },

        //grunt-tslint
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: ['src/**/*.ts']
            }
        },

        //create .d.ts file
        "file-creator": {
            dev: {
                "typings/custom.d.ts": function(fs, fd, done){
                    var createdText = "";
                    //loop over files variable
                    files.forEach(function(val, index){
                        createdText += "///<reference path='./custom/" + val.name + "' />\n"
                    });

                    fs.writeSync(fd, createdText);
                    done();
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-file-creator');


    grunt.registerTask("listFiles", 'list files in a dir', function(){
        list("typings/custom");
    });
    grunt.registerTask("generateDts", ["copy:definitelyTyped", "clean:dev", "listFiles"]);
    grunt.registerTask("updateDts", ["file-creator:dev"]);

    grunt.registerTask("dts", ["generateDts", "updateDts"]);

    grunt.registerTask("default", ["copy:dist", "ts:dev", "dts", "watch:dev"]);

    grunt.registerTask("release", ["clean:release", "ts:release", "bowercopy", "uglify:release", "copy:release", "remove:release", "replace:release"]);

    grunt.registerTask("lint", ["tslint"]);

}
