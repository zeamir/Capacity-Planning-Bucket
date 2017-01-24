"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_module_1 = require("../app.module");
var componentBase_1 = require("./componentBase");
var ReleaseWorkCalculator = (function () {
    function ReleaseWorkCalculator(storyPointsCapacity, doneStoryPoints, remainingStoryPoints, extraStoryPoints, featureEstimationStoryPoints) {
        this.storyPointsCapacity = storyPointsCapacity;
        this.doneStoryPoints = doneStoryPoints;
        this.remainingStoryPoints = remainingStoryPoints | 0;
        this.extraStoryPoints = extraStoryPoints | 0;
        this.featureEstimationStoryPoints = featureEstimationStoryPoints;
    }
    ReleaseWorkCalculator.prototype.getBucketPercentageData = function () {
        var bucketCapacity;
        var doneWorkPercentage;
        var remainingWorkPercentage;
        var freeBucketPercentage;
        var extraWorkPercentage;
        var featureEstimationPercentage;
        var totalStoryPointsScale = this.storyPointsCapacity;
        if (this.extraStoryPoints > 0) {
            // the bucket should be shortened. meaning the entire 100% is not the capacity + extra points
            totalStoryPointsScale = totalStoryPointsScale + this.extraStoryPoints;
        }
        bucketCapacity = 100 * this.storyPointsCapacity / totalStoryPointsScale;
        doneWorkPercentage = 100 * this.doneStoryPoints / totalStoryPointsScale;
        remainingWorkPercentage = 100 * this.remainingStoryPoints / totalStoryPointsScale;
        extraWorkPercentage = 100 * this.extraStoryPoints / totalStoryPointsScale;
        var freeStoryPoints = this.storyPointsCapacity - this.doneStoryPoints - this.remainingStoryPoints;
        freeBucketPercentage = 100 * (freeStoryPoints) / totalStoryPointsScale;
        // feature estimation is determined according to the bucket capacity without taking into account the over capacity
        featureEstimationPercentage = 100 * this.featureEstimationStoryPoints / this.storyPointsCapacity;
        return {
            bucketCapacity: bucketCapacity,
            doneWorkPercentage: doneWorkPercentage,
            remainingWorkPercentage: remainingWorkPercentage,
            freeBucketPercentage: freeBucketPercentage,
            extraWorkPercentage: extraWorkPercentage,
            featureEstimationPercentage: featureEstimationPercentage,
        };
    };
    return ReleaseWorkCalculator;
}());
var ReleaseBucketComponent = (function (_super) {
    __extends(ReleaseBucketComponent, _super);
    function ReleaseBucketComponent($attrs, $scope) {
        var _this = _super.call(this, $attrs, $scope) || this;
        _this.$attrs = $attrs;
        $scope.releaseBucketData =
            _this.time = new Date();
        _this.storyPointsCapacity = 100;
        _this.doneStoryPoints = 30;
        _this.remainingStoryPoints = 20;
        _this.extraStoryPoints = 0;
        _this.featureEstimationStoryPoints = 80;
        _this.calculateBucketData();
        return _this;
    }
    ReleaseBucketComponent.prototype.runFreeCapacityExample = function () {
        this.clearParams();
        this.storyPointsCapacity = 100;
        this.doneStoryPoints = 40;
        this.remainingStoryPoints = 20;
        this.extraStoryPoints = 0;
        this.featureEstimationStoryPoints = 80;
        this.calculateBucketData();
    };
    ReleaseBucketComponent.prototype.runFreeCapacityWithOverFeatureEstimationExample = function () {
        this.clearParams();
        this.storyPointsCapacity = 100;
        this.doneStoryPoints = 20;
        this.remainingStoryPoints = 60;
        this.extraStoryPoints = 0;
        this.featureEstimationStoryPoints = 120;
        this.calculateBucketData();
    };
    ReleaseBucketComponent.prototype.runOverCapacityExample = function () {
        this.clearParams();
        this.storyPointsCapacity = 100;
        this.doneStoryPoints = 70;
        this.remainingStoryPoints = 30;
        this.extraStoryPoints = 100;
        this.featureEstimationStoryPoints = 80;
        this.calculateBucketData();
    };
    ReleaseBucketComponent.prototype.runOverCapacityWithOverFeatureEstimationExample = function () {
        this.clearParams();
        this.storyPointsCapacity = 100;
        this.doneStoryPoints = 20;
        this.remainingStoryPoints = 80;
        this.extraStoryPoints = 100;
        this.featureEstimationStoryPoints = 120;
        this.calculateBucketData();
    };
    ReleaseBucketComponent.prototype.calculateBucketData = function () {
        var calc = new ReleaseWorkCalculator(this.storyPointsCapacity, this.doneStoryPoints, this.remainingStoryPoints, this.extraStoryPoints, this.featureEstimationStoryPoints);
        this.bucketPercentageData = calc.getBucketPercentageData();
    };
    ReleaseBucketComponent.prototype.getDoneStyle = function () {
        // return {'flex-basis': this.getDoneStyle()};
        return { 'flex-basis': this.bucketPercentageData.doneWorkPercentage + '%' };
    };
    ReleaseBucketComponent.prototype.getRemainingStyle = function () {
        return { 'flex-basis': this.bucketPercentageData.remainingWorkPercentage + '%' };
    };
    ReleaseBucketComponent.prototype.getFreeCapacityStyle = function () {
        return { 'flex-basis': this.bucketPercentageData.freeBucketPercentage + '%' };
    };
    ReleaseBucketComponent.prototype.getOverCapacityStyle = function () {
        return { 'flex-basis': this.bucketPercentageData.extraWorkPercentage + '%' };
    };
    ReleaseBucketComponent.prototype.getBucketCapacityStyle = function () {
        return { top: this.bucketPercentageData.extraWorkPercentage + '%' };
    };
    ReleaseBucketComponent.prototype.getFeatureEstimationStyle = function () {
        var borderColor = '#666'; // dark line
        var data = this.bucketPercentageData;
        var adjustedPercentage = data.featureEstimationPercentage;
        console.log('adjustedPercentage = ' + adjustedPercentage);
        if (adjustedPercentage > 100) {
            adjustedPercentage = 100;
            if (data.extraWorkPercentage === 0) {
                borderColor = 'red';
            }
            else {
                borderColor = 'white';
            }
        }
        else if (data.extraWorkPercentage > 0 || ((data.doneWorkPercentage + data.remainingWorkPercentage) > adjustedPercentage)) {
            // should be white dashed line if the line is on top other colors
            borderColor = 'white';
        }
        return { bottom: adjustedPercentage + '%', 'border-color': borderColor };
    };
    ReleaseBucketComponent.prototype.getOverFeatureEstimationSvgStyle = function () {
        if (this.bucketPercentageData.featureEstimationPercentage > 100) {
            return {};
        }
        else {
            return { display: 'none' };
        }
    };
    ReleaseBucketComponent.prototype.getCircleRadiusStyle = function () {
        return { width: this.circleRadius + 'px', height: this.circleRadius + 'px' };
    };
    ReleaseBucketComponent.prototype.getCircleRadiusOnly = function () {
        return this.circleRadius + 'px';
    };
    ReleaseBucketComponent.prototype.clearParams = function () {
        this.storyPointsCapacity = 0;
        this.doneStoryPoints = 0;
        this.remainingStoryPoints = 0;
        this.extraStoryPoints = 0;
        this.featureEstimationStoryPoints = 0;
    };
    return ReleaseBucketComponent;
}(componentBase_1.ComponentBase));
exports.ReleaseBucketComponent = ReleaseBucketComponent;
app_module_1.appModule.component("myReleaseBucket", {
    controller: ReleaseBucketComponent,
    template: require("./release-bucket.component.html!text"),
    styles: require("./release-bucket.component.css!css"),
});
//# sourceMappingURL=release-bucket.component.js.map