module.exports = function (grunt) {
    "use strict";

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
                outDir: 'target',             // If specified, generate an out.js file which is the merged js file
                //watch: 'src',                  // If specified, watches this directory for changes, and re-runs the current target
                // use to override the grunt-ts project options above for this target
                options: {
                    module: 'amd'
                }
            },
            test: {
                src: ["unit-test/testSrc/**/*.spec.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                out: 'unit-test/dist/out.spec.js',             // If specified, generate an out.js file which is the merged js file
                // use to override the grunt-ts project options above for this target
                options: {
                    module: 'amd'
                }
            }
        },
        
        //task to copy html files to the target/release folder
        copy: {
            files: {
                cwd: 'src',  // set working folder / root to copy
                src: '**/*.html',      // copy all files and subfolders **with ending .html**
                dest: 'target',    // destination folder
                expand: true           // required when using cwd
            }
        },

        dtsGenerator: {
            options: {
                out: 'typings/package.d.ts',
                src: ['src/app/components/home/**/*.ts']
            }
        },

        //watch files
        watch: {
            dev: {
                files: ["src/**/*.ts", "src/**/*.html"],
                tasks: ["ts:dev", "copyHtml"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('dts-generator');
    
    grunt.registerTask("generateDts", ["dtsGenerator"]);
    grunt.registerTask("copyHtml", ["copy"]);
    grunt.registerTask("default", ["copyHtml", "ts:dev", "watch:dev"]);
    //grunt.registerTask("test", ["ts:test"]);

}
