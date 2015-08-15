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
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

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
