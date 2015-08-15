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

    $scope.stations = undefined;
    var gMap;

    function initMap() {
      var infowindow;
      var mapCanvas = document.getElementById('googlemap');
      var mapOptions = {
        center: {lat: -37.814107, lng: 144.96328},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      gMap = new google.maps.Map(mapCanvas, mapOptions);
    };

    var initialLocation;
    var browserSupportFlag = new Boolean();
    var infoWindow = new google.maps.InfoWindow({map: map})
    // Try W3C Geolocation
    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        infoWindow.setPosition(pos);
        infoWindow.setContent('Your location');
        map.setCenter(pos);
        // initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        // map.setCenter(initialLocation);
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    }
    // Browser doesn't support Geolocation
    else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }

    // No Geolocation handling
    function handleNoGeolocation(errorFlag) {
      if (errorFlag == true) {
        alert("Couldn't Find Your Location!");
        initialLocation = new google.maps.LatLng(-37.82396, 144.99097)
      }
      else {
        alert("Your browser doesn't support Geolocation. We've placed you at Inspire 9");
        initialLocation = new google.maps.LatLng(-37.82396, 144.99097)
      }
      map.setCenter(initialLocation);
    }

    $http.get(API_MOUNT + 'station')
      .success(function(data) {
        $scope.stations = data;

        initMap();

        for (var i = 0; i < $scope.stations.length; i++) {
          var temp_station = angular.copy($scope.stations[i]);

          $scope.stations[i]['marker'] = new google.maps.Marker({
            position: {lat: temp_station['latitude'], lng: temp_station['longitude']},
            map: gMap,
            animation: google.maps.Animation.DROP,
            title: temp_station['name']
          });
          attachDetailsAndWindow($scope.stations[i]['marker'], $scope.stations[i]);
        };
      });

    // google.maps.event.addDomListener(window, 'load', initMap);
    // marker.setMap(map);

    function attachDetailsAndWindow(marker, station) {
      var fuelString = '';

      for (var i = 0; i < station.fuels_offer.length; i++) {
        fuelString += station.fuels_offer[i]['name'] + ': ' + station.fuels_offer[i]['price'] + 'c<br>';
      };

      var infowindow = new google.maps.InfoWindow({
        content: 'Station Name: ' + station.name + '<br>' +
          'Address: ' + station.address + '<br>' + fuelString
      });

      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    };

  });
