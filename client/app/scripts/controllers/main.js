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

    // Integrating Google Map API 
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

    var initialMarker, initialPos;
    var browserSupportFlag = new Boolean();
    var infoWindow = new google.maps.InfoWindow({gmap: gMap})
    var initialInfoWindow = new google.maps.InfoWindow({
      content: 'You Are Here!'
    });

    // No Geolocation handling
    function handleNoGeolocation(errorFlag) {
      if (errorFlag == true) {
        alert("Couldn't Find Your Location!");
      }
      else {
        alert("Your browser doesn't support Geolocation. We've placed you at Inspire 9");
      }
      initialPos = new google.maps.LatLng(-37.82396, 144.99097);
      initialMarker.setPosition(initialPos);
      gMap.setCenter(initialPos);
    };

    // images for the different brands of fuel stations
    var images = {
      'BP' : '',
      'National Lube' : '',
      'United' : '',
      '7 Eleven' : '',
      'Shell' : '',
      'Fuel Point' : '',
      'Caltex' : '',
      'Ampol' : '',
      'Liberty' : ''
    };

    $http.get(API_MOUNT + 'station')
      .success(function(data) {
        $scope.stations = data;

        initMap();

        initialMarker = new google.maps.Marker({
          map: gMap,
          icon: 'favicon.ico',
          animation: google.maps.Animation.BOUNCE,
          title: 'You Are Here!'
        });

        if(navigator.geolocation) {
          browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            gMap.setCenter(pos);

            initialPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            initialMarker.setPosition(initialPos);
            gMap.setCenter(initialPos);
          }, function() {
            handleNoGeolocation(browserSupportFlag);
          });
        }
        // Browser doesn't support Geolocation
        else {
          browserSupportFlag = false;
          handleNoGeolocation(browserSupportFlag);
        }
        
        initialMarker.addListener('click', function() {
          initialInfoWindow.open(initialMarker.get('map'), initialMarker);
        });

        for (var i = 0; i < $scope.stations.length; i++) {
          var temp_station = angular.copy($scope.stations[i]);

          $scope.stations[i]['marker'] = new google.maps.Marker({
            position: {lat: temp_station['latitude'], lng: temp_station['longitude']},
            map: gMap,
            icon: images[temp_station.brand],
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
          'Brand: ' + station.brand + '<br>' +
          'Address: ' + station.address + '<br>' + 
          fuelString
      });

      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    };

    // Travel Distance Sliders
    $scope.distanceSlider = 5;


  });