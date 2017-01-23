"use strict";
var app_module_1 = require("../app.module");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.run = function () {
        alert("Hello Component");
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
app_module_1.appModule.component("myApp", {
    controller: AppComponent,
    template: require("./app.component.html!text"),
    styles: require("./app.component.css!css"),
});
//# sourceMappingURL=app.component.js.map