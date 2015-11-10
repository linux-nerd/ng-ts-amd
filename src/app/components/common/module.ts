/// <reference path="../../../../typings/tsd.d.ts" />

import * as angular from "angular";
import {Utility} from "./services/utility-service";

let common = angular.module("common", [])
	.service("utilityService", Utility);

export {common};