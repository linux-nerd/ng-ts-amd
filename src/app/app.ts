/// <reference path="../../typings/tsd.d.ts" />
"use strict";

import * as angular from "angular";
import "uiRouter";
import "ocLazyload";
import bootStrapApp from "./bootstrap-app";
import route from "./route";
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
function config($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider): void {
    $locationProvider.html5Mode(true);

    route($stateProvider);
}

// inject the dependencies
config.$inject = ["$stateProvider", "$locationProvider"];

bootStrapApp(app);

export {app};

