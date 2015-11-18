/// <reference path="../../typings/tsd.d.ts" />

import * as angular from "angular";
import "uiRouter";
import "ocLazyload";
import bootStrapApp from "./bootstrap-app";
import "./components/common/module";


// create angular module webApp
// with ui.router, oc.lazyLoad as dependencies.
let app: ng.IModule = angular.module("webApp", ["ui.router", "oc.lazyLoad", "common"]);

app.config(config);

/**
 * @name
 * config
 *
 * @description
 * configuration for routing and dynamically loading modules and injecting them.
 * 
 * @param {ng.ui.IStateProvider} $stateProvider
 */
function config($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider
        .state("lcb", {
            url: "/",
            templateUrl: "app/components/core/views/home.html",
            controller: "HomeCtrl",
            controllerAs: "home",
            resolve: {
                loadController: ['$ocLazyLoad', '$q', function($ocLazyLoad: oc.ILazyLoad, $q: ng.IQService): ng.IPromise<string> {
                    let deferred = $q.defer();
                    require(["./components/core/module", "./components/core/controllers/home"], () => {
                        $ocLazyLoad.inject('webApp.core');
                        deferred.resolve();
                    });

                    return deferred.promise;
                }]
            }
        })
        .state("apple", {
            url: "/apple",
            templateUrl: "app/components/apple/views/apple.html",
            controller: "AppleCtrl",
            controllerAs: "apple",
            resolve: {
                loadController: ['$ocLazyLoad', '$q', function($ocLazyLoad: oc.ILazyLoad, $q: ng.IQService): ng.IPromise<string> {
                    let deferred = $q.defer();
                    require(["./components/apple/module", "./components/apple/controllers/apple"], () => {
                        $ocLazyLoad.inject('webApp.apple');
                        deferred.resolve();
                    });

                    return deferred.promise;
                }]
            }
        });
}

// inject the dependencies
config.$inject = ["$stateProvider"];

bootStrapApp(app);

export {app};

