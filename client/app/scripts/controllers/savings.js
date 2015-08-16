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
    var childrenBound = 75;
    var familyBound = 140;

    var childrenCost = 25;
    var familyCost = 60;
    var teacherCost = 125;


    $scope.savings = angular.copy(savings);

    $scope.number;
    var chosen;

    if ($scope.savings < childrenBound) {
      $scope.number = Math.round($scope.savings / childrenCost);
      chosen = 'children';
    } 
    else if ($scope.savings < familyBound) {
      $scope.number = Math.round($scope.savings / familyCost);
      chosen = 'family';
    }
    else {
      $scope.number = Math.round($scope.savings / teacherCost);
      chosen = 'teacher';
    }

    var choices = {
      'children' : {
        image : 'images/immunisation.jpg',
        message : 'That\'s equivalent to sponsoring ' + $scope.number + ' children\'s immunisation in a third-world country.'
      },
      'family' : {
        image : 'images/water.jpg',
        message : 'That\'s equivalent to providing clean drinking water to ' + $scope.number + ' families in a third-world country.'
      },
      'teacher' : {
        image : 'images/teacher.jpg',
        message : 'That\'s equivalent to training ' + $scope.number + ' teacher(s) in a third-world country.'
      }
    };

    $scope.message = choices[chosen].message;
    $scope.image = choices[chosen].image;

    $scope.ok = function () {
      $modalInstance.close();
    };
  });
