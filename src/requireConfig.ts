/// <reference path="../typings/tsd.d.ts" />

//requirejs configuration file.
require.config({
    paths: {
        "jquery": "../bower_components/jquery/jquery",
        "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap",
        "angular": "../bower_components/angular/angular",
        "uiRouter": "../bower_components/angular-ui-router/release/angular-ui-router",
        "ocLazyload": "../bower_components/oclazyload/dist/ocLazyLoad"
    },
    shim: {
        "angular": {
            exports: "angular",
            deps: ["jquery"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "uiRouter": {
            deps: ["angular"]
        },
        "ocLazyload": {
            deps: ["angular"]
        }
    }
});

//cannot use typescript import as it will bundle the entire require config in a AMD 
//and 'require' will be passed as dependency.
//using plain require of requireJs.
require(["./app/app"]);
