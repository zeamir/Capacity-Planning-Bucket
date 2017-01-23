"use strict";
var ComponentBase = (function () {
    function ComponentBase($attrs, $scope) {
        for (var key in $attrs) {
            if (key[0] == "#") {
                var name_1 = key.substring(1);
                console.log(name_1);
                $scope.$parent.$ctrl[name_1] = this;
            }
        }
    }
    return ComponentBase;
}());
exports.ComponentBase = ComponentBase;
//# sourceMappingURL=componentBase.js.map