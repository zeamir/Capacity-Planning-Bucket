import * as angular from "angular";
import {appModule} from "./app.module";
import {AppComponent} from './components/app.component';
import {ClockComponent} from './components/clock.component';
import {ReleaseBucketComponent} from './components/release-bucket.component';
//import {ClockComponent} from "./components/clock.component";

AppComponent;
ClockComponent;
ReleaseBucketComponent;

angular.bootstrap(document.getElementById("html"), [appModule.name]);
