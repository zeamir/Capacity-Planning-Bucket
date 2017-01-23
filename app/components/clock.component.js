"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_module_1 = require("../app.module");
var componentBase_1 = require("./componentBase");
var ClockComponent = (function (_super) {
    __extends(ClockComponent, _super);
    function ClockComponent($interval, $attrs, $scope) {
        var _this = _super.call(this, $attrs, $scope) || this;
        _this.$interval = $interval;
        _this.time = new Date();
        _this.start();
        return _this;
    }
    ClockComponent.prototype.start = function () {
        var _this = this;
        if (this.intervalId) {
            return;
        }
        this.intervalId = this.$interval(function () {
            _this.time = new Date();
        }, 1000);
    };
    ClockComponent.prototype.stop = function () {
        if (this.intervalId) {
            this.$interval.cancel(this.intervalId);
            this.intervalId = null;
        }
    };
    return ClockComponent;
}(componentBase_1.ComponentBase));
exports.ClockComponent = ClockComponent;
app_module_1.appModule.component("myClock", {
    controller: ClockComponent,
    template: require("./clock.component.html!text"),
    styles: require("./clock.component.css!css"),
});
//# sourceMappingURL=clock.component.js.map