(function () {

    var meanApp = angular.module('myMean');
    meanApp.controller('dashboardController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        console.log('dashboardController load');
        $rootScope.pageHeader = 'Dashboard';
    }]);

})();