/// <reference path="../../../../../typings/tsd.d.ts" />

//import the apple module
import {apple} from "../module";
import {Inject, Controller} from "../../../decorators";

/**
 * @name Apple
 */
@Inject()
@Controller(apple, "AppleCtrl")
class Apple{
	private message: string;

	constructor(){
		this.message = "I am Apple Controller";
	}
}

//add a controller to the core module
//apple.controller("AppleCtrl", Apple);