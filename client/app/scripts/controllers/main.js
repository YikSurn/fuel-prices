'use strict';

/**
 * @ngdoc function
 * @name fuelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuelApp
 */
angular.module('fuelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
