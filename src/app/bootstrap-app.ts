/// <reference path="../../typings/tsd.d.ts" />

/**
 * @name 
 * bootStrapApp
 * 
 * @description
 * This function will wait for the document to load and manually bootstrap webApp module.
 * 
 * @param {angular.IModule} app
 *
 * @example
 * bootStrapApp(webAppModule);
 */
export default function bootStrapApp(app : angular.IModule): void{
	// wait for the document to load
    angular.element(document).ready((): void => {

    	// cache the reference to html DOM in a variable
        var $html = angular.element('html');

        // bootstrap webApp module manually
        angular.bootstrap($html, [app.name]);
    });
}