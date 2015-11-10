/// <reference path="../../../../../typings/tsd.d.ts" />

//import the apple module
import {apple} from "../module";

/**
 * @name Apple
 */
class Apple{
	private message: string;

	constructor(){
		this.message = "I am Apple Controller";
	}
}

//add a controller to the core module
apple.controller("AppleCtrl", Apple);