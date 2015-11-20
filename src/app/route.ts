/// <reference path="../../typings/tsd.d.ts" />

export default function route($stateProvider: ng.ui.IStateProvider): void{
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