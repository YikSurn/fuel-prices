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

    $scope.selected = {
      fuel : undefined
    };
    $scope.types = ['All Types', 'Diesel', 'Unleaded', 'Premium 95', 'Premium 98'];

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

          // Change fuels_offer from array to dictionary
          var temp_fuel_price = {};
          for (var j = 0; j < temp_station.fuels_offer.length; j++) {
            var temp = angular.copy(temp_station.fuels_offer[j]);
            temp_fuel_price[temp_station.fuels_offer[j].name] = temp_station.fuels_offer[j].price;
          };
          $scope.stations[i].fuels_offer = angular.copy(temp_fuel_price);

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

      for (var type in station.fuels_offer) {
        fuelString += type + ': ' + station.fuels_offer[type] + 'c<br>';
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

    $scope.updateMarkers = function () {
      var fuel_type = angular.copy($scope.selected.fuel);
      var min_station = $scope.stations[0];
      for (var i = 1; i < $scope.stations.length; i++) {
        // $scope.stations[i]
      };
    };
  });