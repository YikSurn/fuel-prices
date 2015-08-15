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
    $scope.types = ['Diesel', 'Unleaded', 'Premium Unleaded 95', 'Premium Unleaded 98'];

    // Integrating Google Map API 
    $scope.stations = undefined;
    var gMap, infowindow;
    var initialMarker, initialPos;
    var browserSupportFlag = new Boolean();
    var initialInfoWindow = new google.maps.InfoWindow({
      content: 'You Are Here!'
    });

    function initMap() {
      var mapCanvas = document.getElementById('googlemap');
      var mapOptions = {
        center: {lat: -37.814107, lng: 144.96328},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      gMap = new google.maps.Map(mapCanvas, mapOptions);
      infowindow = new google.maps.InfoWindow();

      google.maps.event.addListener(gMap, 'click', function() {
        infowindow.close();
        initialInfoWindow.close();
      });
    };


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
      // 'BP' : 'images/BP.ico',
      // 'National Lube' : 'images/national_lube.ico',
      // 'United' : 'images/united-logo.ico',
      // '7 Eleven' : 'images/711.ico',
      // 'Shell' : 'images/Shell_logo.ico',
      // // 'Fuel Point' : 'images/',
      // 'Caltex' : 'images/caltex.ico',
      // // 'Ampol' : 'images/',
      // 'Liberty' : 'images/logo-liberty.ico'
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
            initialInfoWindow.setPosition(pos);
            initialInfoWindow.setContent('You are here!');
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

      google.maps.event.addListener(marker, 'click', function(e) {
        infowindow.setContent('Station Name: ' + station.name + '<br>' +
            'Brand: ' + station.brand + '<br>' +
            'Address: ' + station.address + '<br>' + 
            fuelString);
        infowindow.open(gMap, this);
      });
    };

    // Default Travel Distance Slider 
    $scope.distanceSlider = 5;

    $scope.cheapestStations = function () {
      // To close all currently open infowindows
      google.maps.event.trigger(gMap, 'click');

      var fuel_type = angular.copy($scope.selected.fuel);
      var min_stations = [$scope.stations[0]];
      for (var i = 1; i < $scope.stations.length; i++) {
        // Stop previously bouncing markers
        $scope.stations[i].marker.setAnimation(null);

        if ($scope.stations[i].fuels_offer[fuel_type] < min_stations[0].fuels_offer[fuel_type]) {
          min_stations = [$scope.stations[i]];
        } else if ($scope.stations[i].fuels_offer[fuel_type] == min_stations[0].fuels_offer[fuel_type]) {
          min_stations.push($scope.stations[i]);
        }
      };

      if (min_stations.length == 1) {
        google.maps.event.trigger(min_stations[0].marker, 'click');
      }
      for (var i = 0; i < min_stations.length; i++) {
        min_stations[i].marker.setAnimation(google.maps.Animation.BOUNCE);
      };
    };

    // Cost savings calculator
    $scope.calculatorInput = {
      size: undefined,
      type: undefined,
      freq: undefined,
      savings: undefined
    };

    $scope.calculator = {
      sizes: [
        { id: 0, label: 'Small', value: 42 },
        { id: 1, label: 'Medium', value: 70 },
        { id: 2, label: 'Large', value: 85 }
      ],
      types: [
        { id: 0, label: 'Diesel', value: 5.7 },
        { id: 1, label: 'Unleaded', value: 7.4 },
        { id: 2, label: 'Premium Unleaded 95', value: 4.2 },
        { id: 3, label: 'Premium Unleaded 98', value: 7 }
      ]
    };

    $scope.calcSavings = function() {
      var monthsInYear = 12;
      var convertToDollar = 0.01;
      $scope.calculatorInput.savings = ($scope.calculatorInput.size * $scope.calculatorInput.type *
        $scope.calculatorInput.freq * monthsInYear * convertToDollar).toFixed(2);
    };

    // Find cheapest fuel station within given distance
    function findCheapestWithinDistance(pt, max_distance) {
      var cheapest = {distance: null, price: null, longitude: null, latitude: null};
      for (var i = 0; i < $scope.stations.length; i++) {
        var tempStation = angular.copy($scope.stations[i]);
        var station_pos = new google.maps.LatLng(tempStation.latitude, tempStation.longitude);
        // Compute distance from pt to station
        $scope.stations[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt,station_pos);
        // if distance exceeds max_distance, skip to next station
        if ($scope.stations[i].distance > max_distance) {
          continue;
        }
        // Keep track of cheapest price 
        if (i == 0) {
          cheapest.distance = $scope.station[i].distance;
          // cheapest['price'] = ;
          cheapest.latitude = tempStation.latitude;
          cheapest.longitude = tempStation.longitude;
        } 
        // else {
        //   // if curr station price is cheaper, update cheapest
        //   if ($scope.station[i][] < cheapest.price) {
        //     cheapest.distance = $scope.station[i].distance;
        //     cheapest['price'] = ;
        //     cheapest.latitude = tempStation['latitude'];
        //     cheapest.longitude  = tempStation['longitude'];
        //   }
        // }
      }
      console.log(cheapest);
      // plot the cheapest station on map
      cheapestMarker = new google.maps.Marker({
        position: {lat: cheapest.latitude, lng: cheapest.longitude},
        map: gMap,
        icon: '',
        animation: google.maps.Animation.BOUNCE,
        title: 'Pump here!'
      });
      cheapestMarker.addListener('click', function() {
        infowindow.open(cheapestMarker.get('map'), cheapestMarker);
      });
    };

  });