/// <reference path="../../../../../typings/tsd.d.ts" />

//import {common} from "../module";

class Utility{
	constructor(){
		this.logSomething("hello World");
	}

	public logSomething(sm: string): void{
		console.log(sm);
	}
}

export {Utility};

//common.service("utilityService", Utility);