/// <reference path="../../../../../typings/tsd.d.ts" />

//import the core module 
import {core} from "../module";
//import "../../common/services/utility-service";

/**
 * @name Home
 */
class Home{
	private message = "I am home Controller";

	//inject the dependencies
	static $inject = ["$state", "utilityService"];
	constructor(private $state: ng.ui.IStateService, utilityService) {
		utilityService.logSomething("abc");
	}

	/**
	 * @name goToState
	 *
	 * @description
	 * redirects to a particular state
	 * 
	 * @param {string} state
	 */
	public goToState(state: string): void{
		this.$state.go(state);
	}
}

//add a controller to the core module
core.controller("HomeCtrl", Home);