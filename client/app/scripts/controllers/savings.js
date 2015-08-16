'use strict';

/**
 * @ngdoc function
 * @name fuelPricesApp.controller:SavingsModalCtrl
 * @description
 * # SavingsModalCtrl
 * Controller of the fuelPricesApp
 */
angular.module('fuelPricesApp')
  .controller('SavingsModalCtrl', function ($scope, savings, $modalInstance) {
    console.log(savings);
    $scope.savings = angular.copy(savings);

    $scope.ok = function () {
      $modalInstance.close();
    };
  });
