'use strict';

/**
 * @ngdoc overview
 * @name fuelPricesApp
 * @description
 * # fuelPricesApp
 *
 * Main module of the application.
 */
angular
.module('fuelPricesApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'rzModule',
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
  function ($locationProvider, $stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    });
   
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
])
.run(['$http', '$state', '$cookies', '$rootScope',
  function($http, $state, $cookies, $rootScope) {
    // ensure that page autoscrolls to the top 
    $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);