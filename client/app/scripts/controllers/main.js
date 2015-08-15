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

    var infowindow;
    var mapCanvas = document.getElementById('googlemap');
    var mapOptions = {
      center: {lat: -37.814107, lng: 144.96328},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var gMap = new google.maps.Map(mapCanvas, mapOptions);

    $http.get(API_MOUNT + 'station')
      .success(function(data) { 
        $scope.stations = data;

        for (var i = 0; i < $scope.stations.length; i++) {
          temp_station = angular.copy($scope.stations[i]);
          console.log(temp_station);

          $scope.stations[i]['address'] = temp_station.street + ', ' + temp_station.suburbs + temp_station.postcode

          $scope.stations[i]['marker'] = new google.maps.Marker({
            position: {lat: parseFloat(temp_station['latitude']), lng: parseFloat(temp_station['latitude'])},
            map: gMap,
            animation: google.maps.Animation.DROP,
            title: temp_station['name']
            // label: "a"
          });
          attachDetailsAndWindow($scope.stations[i]['marker'], $scope.stations[i]);
        };
      });

    // google.maps.event.addDomListener(window, 'load', initMap);
    // marker.setMap(map);

    function attachDetailsAndWindow(marker, station) {
      var infowindow = new google.maps.InfoWindow({
        content: 'Station Name: ' + station.name +
          'Address: ' + station.address + station.
      });

      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    };

  });
