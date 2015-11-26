/// <reference path="../../typings/tsd.d.ts" />

/**
 * @name Inject
 * @param dependencies
 * @returns {function(Function, string=): void}
 * @description
 * Used for dependency injection in angularjs. The biggest benifit of using Inject decorator is,
 * when there are lot of dependency then its not required to write all the dependency to $inject static array.
 *
 * @example
 * ============== someCtrl.ts ============
 * @Inject()
 * class SomeCtrl{
 *      constructor($scope: ng.IScope){
 *
 *      }
 * }
 *
 * The above piece of code is exactly like
 *
 * class SomeCtrl{
 *      static $inject = ["$scope"];
 *      constructor($scope: ng.IScope){
 *
 *      }
 * }
 *
 */
function Inject(): Function{
    return (target: Function, decoratedPropertyName? : string): void => {

        let deps: Array<string> = target.toString()                 // convert the function to string
            .replace(/\s+/g,'')                                     // strip spaces
            .replace(/[/][*][^/*]*[*][/]/g,'')                      // strip simple comments
            .split('){',1)[0].replace(/^[^(]*[(]/,'')               // extract the parameters
            .replace(/=[^,]+/g,'')                                  // strip any ES6 defaults
            .split(',').filter(Boolean);                            // split & filter [""]

        let $inject = [];
        $inject = $inject.concat(deps);
        target.prototype.$inject = $inject;
        target.$inject = $inject;
    }
}

export {Inject};

