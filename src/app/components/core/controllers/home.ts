/// <reference path="../../../../../typings/tsd.d.ts" />

//import the core module 
import {core} from "../module";

//import "../../common/services/utility-service";
import {Inject, Controller} from "../../../decorators";

/**
 * @name Home
 */
@Controller(core, "HomeCtrl")
@Inject()
class Home{
	private message = "I am home Controller";
	
	
	constructor(private $state: ng.ui.IStateService, private utilityService) {
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