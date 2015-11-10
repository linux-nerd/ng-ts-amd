/// <reference path="../../typings/tsd.d.ts" />
/// 
import * as angular from "angular";
import "angularMocks";
import {core} from "../app/components/core/module";

describe("homeController", ()=>{
	beforeEach(function(){
		angular.module(core.name);
	})

	it("should pass", () => {
		expect("foo").toEqual("foo");
	});
})