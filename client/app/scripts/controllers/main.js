'use strict';

/**
 * @ngdoc function
 * @name fuelPricesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuelPricesApp
 */
angular.module('fuelPricesApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.stations;

    var mapCanvas = document.getElementById('googlemap');
    var mapOptions = {
      center: {lat: -37.814107, lng: 144.96328},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    $http.get(API_MOUNT + 'station')
      .success(function(data) { 
        $scope.stations = data;

        for (var i = 0; i < $scope.stations.length; i++) {

          $scope.stations[i]['marker'] = new google.maps.Marker({
            position: {lat: $scope.stations[i]['latitude'], lng: $scope.stations[i]['latitude']},
            map: map,
            animation: google.maps.Animation.DROP,
            title: $scope.stations[i]['name']
            // label: "a"
          });

          $scope.stations[i]['marker'].addListener('click', showDetails);
        };
      });

    var infowindow = new google.maps.InfoWindow({
      content: "HELLO NEXUSFUEL!"
    });

    // google.maps.event.addDomListener(window, 'load', initMap);
    // marker.setMap(map);

    function showDetails() {
      infowindow.open(map, marker);
    };

  });
