export class ComponentBase {
    constructor($attrs, $scope) {
        for(var key in $attrs) {
            if(key[0]=="#") {
                const name = key.substring(1);
                console.log(name);

                $scope.$parent.$ctrl[name] = this;
            }
        }
    }
}
