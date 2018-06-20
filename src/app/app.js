(function () {
    'use strict';
    var meanApp = angular.module('myMean', ['ui.router']);

    meanApp.config(['$stateProvider', '$urlRouterProvider', configRoutes]);


    meanApp.controller('meanController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        // create a message to display in our view
        $rootScope.pageHeader = 'Index Page';
    }]);


    function configRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dist', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'dashboardController',
                data: {
                    title: 'Dashboard',
                    breadcrumbs: true
                }
                // controllerAs: 'dash'
            })
            .state('employee', {
                url: '/employee',
                templateUrl: 'app/employee/employee.html',
                controller: 'employeeController',
                data: {
                    title: 'Dashboard',
                    breadcrumbs: true
                }
                // controllerAs: 'emp'
            });

        $urlRouterProvider.otherwise("/dashboard");
    }

    // meanApp.run(['$state', function ($state) {

    // }]);

})();