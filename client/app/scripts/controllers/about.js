'use strict';

/**
 * @ngdoc function
 * @name fuelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fuelApp
 */
angular.module('fuelApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
