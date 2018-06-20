(function () {
    'use strict';

    var app = angular.module('myMean');

    var breadcrumb = function ($state, $stateParams) {
        return {
            restrict: 'E',
            template: 'app/common/Utility/breadcrumb.html',
            replace: true,
            complie: ['el', 'att', function (el, att) {
                return ['$scope', 'el', 'att', function ($scope, el, att) {
                    if (!angular.isDefined(state.data))
                        return false;
                    else if (!angular.isDefined(state.data.breadcrumb))
                        return false;
                    return true;
                }];
            }]
        };
    };


    app.directive('breadcrumb', ['$state,$stateParams'], breadcrumb);

})();