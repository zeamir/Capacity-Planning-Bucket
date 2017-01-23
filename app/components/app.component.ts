import {appModule} from "../app.module";

export class AppComponent {
    constructor() {
    }

    run() {
        alert("Hello Component");
    }
}

appModule.component("myApp", <any>{
	controller: AppComponent,
	template: require("./app.component.html!text"),
    styles: require("./app.component.css!css"),
});
