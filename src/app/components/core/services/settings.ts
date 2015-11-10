/// <reference path="../../../../../typings/tsd.d.ts" />


import {core} from "../module";

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