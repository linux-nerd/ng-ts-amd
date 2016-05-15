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
    };
}




/**
 * @name Controller
 * @description This will register controller on the passed module.
 * @param  {ng.IModule} module         module on which the controller has to be registered.
 * @param  {string}     controllerName name of the controller that  has to be registered.
 * @return {Function}   
 *
 * @example
 * ==============ctrl.ts================
 * @Controller(module, 'ctrlName')
 * class Ctrl{
 *     constructor(){
 *     }
 * }
 */
function Controller(module: ng.IModule, controllerName: string): Function {
    return (target: Function) => {
        module.controller(controllerName, target);
    };
}


/**
 * @name Service
 * @description This will register service on the passed module.
 * @param  {ng.IModule} module      module on which the service has to be registered.
 * @param  {string}     serviceName name of the service that  has to be registered.
 * @return {Function}     
 *
 * @example
 * ==============ctrl.ts================
 * @Service(module, 'serviceName')
 * class SomeService{
 *     constructor(){
 *     }
 * }
 */
function Service(module: ng.IModule, serviceName: string): Function {
    return (target: Function) => {
        module.service(serviceName, target);
    };
}


function Directive(module: ng.IModule, directiveName, directiveDefinitionObject: any): Function{
    return (target: any) => {
        for(let key in directiveDefinitionObject) {
            if(directiveDefinitionObject.hasOwnProperty(key)){
                target.prototype[key] = directiveDefinitionObject[key];
            }
        }
        
        //register a directive
        module.directive(directiveName, target.factory());
    };
}

function Filter(module: ng.IModule, filterName: string): Function{
    return (target: Function): void => {
        let fn = () => {
            let instance = new target();
            return instance.filter;
        };
        
        module.filter(filterName, fn);
    };
}


export {Inject, Controller, Service, Directive, Filter};

