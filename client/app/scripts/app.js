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
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

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