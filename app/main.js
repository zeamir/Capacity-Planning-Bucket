"use strict";
var angular = require("angular");
var app_module_1 = require("./app.module");
var app_component_1 = require("./components/app.component");
var clock_component_1 = require("./components/clock.component");
var release_bucket_component_1 = require("./components/release-bucket.component");
//import {ClockComponent} from "./components/clock.component";
app_component_1.AppComponent;
clock_component_1.ClockComponent;
release_bucket_component_1.ReleaseBucketComponent;
angular.bootstrap(document.getElementById("html"), [app_module_1.appModule.name]);
//# sourceMappingURL=main.js.map