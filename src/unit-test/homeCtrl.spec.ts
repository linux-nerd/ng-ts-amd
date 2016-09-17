/// <reference path="../../typings/tsd.d.ts" />
/// 
import * as angular from "angular";
import "angularMocks";
import "uiRouter";

import {core} from "../app/components/core/module";
import "../app/components/core/controllers/home";

import {common} from "../app/components/common/module";

describe("homeController", ()=>{
	
	let ng: any = angular,
		$controller,
		$state,
		utilityService,
		homeCtrl;
	
	beforeEach(function(){
		ng.mock.module(core.name);
		ng.mock.module(common.name);
		ng.mock.module("ui.router");
	});
	
	beforeEach(ng.mock.inject(function($injector){
		$state = $injector.get("$state");
		utilityService = $injector.get("utilityService");
		$controller = $injector.get("$controller");
		
		homeCtrl = $controller("HomeCtrl", {
			$state: $state,
			utilityService: utilityService
		});
		
	}));

	it("should have goToState method", () => {
		expect(homeCtrl.goToState).toBeDefined();
	});
});