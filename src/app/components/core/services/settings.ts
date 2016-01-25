/// <reference path="../../../../../typings/tsd.d.ts" />


import {core} from "../module";
/*import {Inject, Provider} from "../../../decorators";

@Inject()
@Provider(core, "SettingsService")
class Settings {
	private route = 'apple';
	
	constructor() {

	}
	
	public $get() {

	}
}*/

core.provider("SettingsService", ()=>{
	var route = 'apple';

	return {
		$get: function() {
			return this;
		},

		fruit: ['$q', function($q) {
			var deferred = $q.defer();
			deferred.resolve(route);
			return deferred.promise;
		}]
	};
});