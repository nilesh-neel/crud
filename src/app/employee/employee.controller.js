(function () {

    var meanApp = angular.module('myMean');
    meanApp.controller('employeeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        console.log('employeeController load');
        $rootScope.pageHeader = 'Employee Details';
    }]);

})();