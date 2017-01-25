import {appModule} from '../app.module';
import {ComponentBase} from './componentBase';

interface BucketChartPercentageData {
	bucketCapacity: number;
	doneWorkPercentage: number;
	remainingWorkPercentage: number;
	freeBucketPercentage: number;
	extraWorkPercentage: number;
	featureEstimationPercentage: number;

}

class ReleaseWorkCalculator {
	storyPointsCapacity: number;
	doneStoryPoints: number;
	remainingStoryPoints: number;
	extraStoryPoints: number;
	featureEstimationStoryPoints: number;

	constructor(storyPointsCapacity: number, doneStoryPoints: number, remainingStoryPoints: number | undefined, extraStoryPoints: number | undefined, featureEstimationStoryPoints: number) {

		this.storyPointsCapacity = storyPointsCapacity;
		this.doneStoryPoints = doneStoryPoints;
		this.remainingStoryPoints = remainingStoryPoints | 0;
		this.extraStoryPoints = extraStoryPoints | 0;
		this.featureEstimationStoryPoints = featureEstimationStoryPoints;
	}

	getBucketPercentageData(): BucketChartPercentageData {
		let bucketCapacity: number;
		let doneWorkPercentage: number;
		let remainingWorkPercentage: number;
		let freeBucketPercentage: number;
		let extraWorkPercentage: number;
		let featureEstimationPercentage: number;

		let totalStoryPointsScale;
		let freeStoryPoints;
		if (this.storyPointsCapacity> 0) {
			totalStoryPointsScale = this.storyPointsCapacity;
			freeStoryPoints = this.storyPointsCapacity - this.doneStoryPoints - this.remainingStoryPoints;
		} else {
			// since bucket capacity is zero, then we are treating the bucket as full, without any over capacity.
			// this is because over capacity is meaningless without first specifying the bucket capacity.
			totalStoryPointsScale = this.doneStoryPoints + this.remainingStoryPoints;
			freeStoryPoints = 0;
			this.extraStoryPoints = 0;
		}
		if (this.extraStoryPoints > 0) {
			// the bucket should be shortened. meaning the entire 100% is not the capacity + extra points
			totalStoryPointsScale = totalStoryPointsScale + this.extraStoryPoints;
		}
		bucketCapacity = 100 * this.storyPointsCapacity / totalStoryPointsScale;

		doneWorkPercentage = 100 * this.doneStoryPoints / totalStoryPointsScale;
		remainingWorkPercentage = 100 * this.remainingStoryPoints / totalStoryPointsScale;
		extraWorkPercentage = 100 * this.extraStoryPoints / totalStoryPointsScale;
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
		}
	}
}

export class ReleaseBucketComponent extends ComponentBase {
	time: Date;
	storyPointsCapacity: number;
	doneStoryPoints: number;
	remainingStoryPoints: number;
	extraStoryPoints: number;
	featureEstimationStoryPoints: number;
	circleRadius: number;

	bucketPercentageData: BucketChartPercentageData;


	constructor(private $attrs, $scope) {
		super($attrs, $scope);
		$scope.releaseBucketData =

			this.time = new Date();

		this.storyPointsCapacity = 100;
		this.doneStoryPoints = 30;
		this.remainingStoryPoints = 20;
		this.extraStoryPoints = 0;
		this.featureEstimationStoryPoints = 80;

		this.calculateBucketData();
	}

	runFreeCapacityExample() {

		this.clearParams();

		this.storyPointsCapacity = 100;
		this.doneStoryPoints = 40;
		this.remainingStoryPoints = 20;
		this.extraStoryPoints = 0;
		this.featureEstimationStoryPoints = 80;

		this.calculateBucketData();
	}

	runFreeCapacityWithOverFeatureEstimationExample() {

		this.clearParams();

		this.storyPointsCapacity = 100;
		this.doneStoryPoints = 20;
		this.remainingStoryPoints = 60;
		this.extraStoryPoints = 0;
		this.featureEstimationStoryPoints = 120;

		this.calculateBucketData();
	}

	runOverCapacityExample() {

		this.clearParams();

		this.storyPointsCapacity = 100;
		this.doneStoryPoints = 70;
		this.remainingStoryPoints = 30;
		this.extraStoryPoints = 100;
		this.featureEstimationStoryPoints = 80;

		this.calculateBucketData();
	}

	runOverCapacityWithOverFeatureEstimationExample() {

		this.clearParams();

		this.storyPointsCapacity = 100;
		this.doneStoryPoints = 20;
		this.remainingStoryPoints = 80;
		this.extraStoryPoints = 100;
		this.featureEstimationStoryPoints = 120;

		this.calculateBucketData();
	}

	calculateBucketData() {
		const calc: ReleaseWorkCalculator = new ReleaseWorkCalculator(this.storyPointsCapacity,
			this.doneStoryPoints, this.remainingStoryPoints, this.extraStoryPoints, this.featureEstimationStoryPoints);
		this.bucketPercentageData = calc.getBucketPercentageData();
	}

	getDoneStyle() {
		// return {'flex-basis': this.getDoneStyle()};
		return {'flex-basis': this.bucketPercentageData.doneWorkPercentage + '%'};
	}

	getRemainingStyle() {
		return {'flex-basis': this.bucketPercentageData.remainingWorkPercentage + '%'};
	}

	getFreeCapacityStyle() {
		return {'flex-basis': this.bucketPercentageData.freeBucketPercentage + '%'};
	}

	getOverCapacityStyle() {
		return {'flex-basis': this.bucketPercentageData.extraWorkPercentage + '%'};
	}

	getBucketCapacityStyle() {
		// return {top: this.bucketPercentageData.extraWorkPercentage + '%', 'border-style': this.getBorderStyle()};
		return {top: this.bucketPercentageData.extraWorkPercentage + '%'};
	}

	getFeatureEstimationStyle() {
		let borderColor = '#666'; // dark line
		let data = this.bucketPercentageData;
		let adjustedPercentage: number = data.featureEstimationPercentage;
		console.log('adjustedPercentage = ' + adjustedPercentage);
		if (adjustedPercentage > 100) {
			adjustedPercentage = 100;
			if (data.extraWorkPercentage === 0) {
				borderColor = 'red';
			} else {
				borderColor = 'white';
			}
		} else if (data.extraWorkPercentage > 0 || ((data.doneWorkPercentage + data.remainingWorkPercentage) > adjustedPercentage)) {
			// should be white dashed line if the line is on top other colors
			borderColor = 'white';
		}

		return {bottom: adjustedPercentage + '%', 'border-color': borderColor};
	}

	getOverFeatureEstimationSvgStyle() {
		if (this.bucketPercentageData.featureEstimationPercentage > 100) {
			return {};
		} else {
			return {display: 'none'};
		}
	}

	getBucketBottomStyle() {
		return {'border-style': this.getBorderStyle()};
	}

	private getBorderStyle(): string {
		// where there is not capacity at all, border should be dashed
		let ret = 'solid';
		if (this.bucketPercentageData.bucketCapacity = 0) {
			ret = 'dashed'
		}
		return ret;
	}

	getCircleRadiusStyle() {
		return {width: this.circleRadius + 'px', height: this.circleRadius + 'px'};
	}

	getCircleRadiusOnly() {
		return this.circleRadius + 'px';
	}

	private clearParams() {
		this.storyPointsCapacity = 0;
		this.doneStoryPoints = 0;
		this.remainingStoryPoints = 0;
		this.extraStoryPoints = 0;
		this.featureEstimationStoryPoints = 0;

	}

}

appModule.component("myReleaseBucket", <any>{
	controller: ReleaseBucketComponent,
	template: require("./release-bucket.component.html!text"),
	styles: require("./release-bucket.component.css!css"),
});
