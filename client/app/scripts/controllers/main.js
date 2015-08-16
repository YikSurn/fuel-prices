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
    $scope.currPos = new google.maps.LatLng(-37.82396, 144.99097);
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
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      gMap = new google.maps.Map(mapCanvas, mapOptions);
      infowindow = new google.maps.InfoWindow();

      google.maps.event.addListener(gMap, 'click', function() {
        infowindow.close();
        initialInfoWindow.close();
      });
    }


    // No Geolocation handling
    function handleNoGeolocation(errorFlag) {
      if (errorFlag === true) {
        alert('Couldn\'t Find Your Location!');
      }
      else {
        alert('Your browser doesn\'t support Geolocation. We\'ve placed you at Inspire 9');
      }
      initialPos = new google.maps.LatLng(-37.82396, 144.99097);
      initialMarker.setPosition(initialPos);
      gMap.setCenter(initialPos);
    }

    // images for the different brands of fuel stations
    var images = {
      'BP' : 'images/BP.ico',
      'National Lube' : 'images/national_lube.ico',
      'United' : 'images/united-logo.ico',
      '7 Eleven' : 'images/711.ico',
      'Shell' : 'images/Shell_logo.ico',
      'Fuel Point' : 'images/no-logo-petrol.ico',
      'Caltex' : 'images/caltex.ico',
      'Ampol' : 'images/no-logo-petrol.ico',
      'Liberty' : 'images/logo-liberty.ico'
    };

    // Cost savings calculator
    $scope.calculatorInput = {
      size: undefined,
      type: undefined,
      freq: undefined,
      savings: undefined
    };

    $scope.calculator = {
      // Number of litres the size of car could have
      sizes: [
        {label: 'Small', value: 42 },
        {label: 'Medium', value: 70 },
        {label: 'Large', value: 85 }
      ],
      // potential cost savings of a fuel type
      types: []
    };

    $scope.calcSavings = function() {
      var monthsInYear = 12;
      var convertToDollar = 0.01;
      $scope.calculatorInput.savings = ($scope.calculatorInput.size * $scope.calculatorInput.type *
        $scope.calculatorInput.freq * monthsInYear * convertToDollar).toFixed(2);
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
            };
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
          var tempStation = angular.copy($scope.stations[i]);

          // Change fuels_offer from array to dictionary
          var tempFuelPrice = {};
          for (var j = 0; j < tempStation.fuels_offer.length; j++) {
            var temp = angular.copy(tempStation.fuels_offer[j]);
            tempFuelPrice[temp.name] = temp.price;
          }
          $scope.stations[i].fuels_offer = angular.copy(tempFuelPrice);

          $scope.stations[i].marker = new google.maps.Marker({
            position: {lat: tempStation.latitude, lng: tempStation.longitude},
            map: gMap,
            icon: images[tempStation.brand],
            animation: google.maps.Animation.DROP,
            title: tempStation.name
          });
          attachDetailsAndWindow($scope.stations[i].marker, $scope.stations[i]);
        }

        // Calculate potential savings for each fuel type
        function fuelSavings() {
          var minMaxDict = {
            'Diesel' : undefined, 
            'Unleaded' : undefined,
            'Premium Unleaded 95' : undefined,
            'Premium Unleaded 98' : undefined
          };

          for (var i = 0; i < $scope.stations.length; i++) {
            var temp = angular.copy($scope.stations[i].fuels_offer);
            for (var fueltype in temp) {
              if (minMaxDict[fueltype] === undefined) {
                minMaxDict[fueltype] = {};
                minMaxDict[fueltype].min = temp[fueltype];
                minMaxDict[fueltype].max = temp[fueltype];
                continue;
              } 
              
              if (temp[fueltype] < minMaxDict[fueltype].min) {
                minMaxDict[fueltype].min = temp[fueltype];
              }

              if (temp[fueltype] > minMaxDict[fueltype].max) {
                minMaxDict[fueltype].max = temp[fueltype];
              }

            }
          }

          for (var fueltypeDict in minMaxDict) {
            $scope.calculator.types.push({label: fueltypeDict, value: minMaxDict[fueltypeDict].max - minMaxDict[fueltypeDict].min });
          }
        }

        fuelSavings();
      });

    function attachDetailsAndWindow(marker, station) {
      var fuelString = '';

      for (var type in station.fuels_offer) {
        fuelString += type + ': ' + station.fuels_offer[type] + 'c<br>';
      }

      google.maps.event.addListener(marker, 'click', function(e) {
        infowindow.setContent('Station Name: ' + station.name + '<br>' +
            'Brand: ' + station.brand + '<br>' +
            'Address: ' + station.address + '<br>' + 
            fuelString);
        infowindow.open(gMap, this);
      });
    }

    // Default Travel Distance Slider 
    $scope.distanceSlider = 5;

    $scope.cheapestStations = function () {
      // To close all currently open infowindows
      google.maps.event.trigger(gMap, 'click');

      var fuelType = angular.copy($scope.selected.fuel);
      var minStations = [$scope.stations[0]];
      for (var i = 1; i < $scope.stations.length; i++) {
        // Stop previously bouncing markers
        $scope.stations[i].marker.setAnimation(null);

        if ($scope.stations[i].fuels_offer[fuelType] < minStations[0].fuels_offer[fuelType]) {
          minStations = [$scope.stations[i]];
        } else if ($scope.stations[i].fuels_offer[fuelType] === minStations[0].fuels_offer[fuelType]) {
          minStations.push($scope.stations[i]);
        }
      }

      if (minStations.length === 1) {
        google.maps.event.trigger(minStations[0].marker, 'click');
      }
      for (var j = 0; j < minStations.length; j++) {
        minStations[j].marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };


    // Find cheapest fuel station within given distance
    $scope.findCheapestWithinDistance = function(maxDistance) {
      var fuelType = angular.copy($scope.selected.fuel);
      var minStations = undefined;
      var firstInDist = false;

      for (var i = 0; i < $scope.stations.length; i++) {
        var stationPos = new google.maps.LatLng($scope.stations[i].latitude, $scope.stations[i].longitude);
        // Compute distance from curr location to station
        $scope.stations[i].distance = google.maps.geometry.spherical.computeDistanceBetween($scope.currPos,stationPos);
        // if distance exceeds maxDistance, skip to next station
        if (($scope.stations[i].distance)/1000 > maxDistance) {
          $scope.stations[i].marker.setMap(null);
        }
        else {
          $scope.stations[i].marker.setMap(gMap);

          if (!firstInDist) {
            // Take the first station within distance to compare fuel prices
            minStations = [$scope.stations[i]];
            firstInDist = true;
          }
          // Keep track of cheapest price
          else if ($scope.stations[i].fuels_offer[fuelType] < minStations[0].fuels_offer[fuelType]) {
            minStations = [$scope.stations[i]];
          } 
          else if ($scope.stations[i].fuels_offer[fuelType] === minStations[0].fuels_offer[fuelType]) {
            minStations.push($scope.stations[i]);
          }
        }
      }

      // show the cheapest station on map
      if (minStations === undefined) {
        // No stations in range
        alert('No stations within specified distance!');
      }
      else {
        if (minStations.length === 1) {
          google.maps.event.trigger(minStations[0].marker, 'click');
        }
        for (var j = 0; j < minStations.length; j++) {
          minStations[j].marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
    };

    var destinationAddress = angular.copy($scope.address);

    // Test direction func --------------------------------------
    var directionService = new google.maps.DirectionsService(),
        directionDisplay = new google.maps.DirectionsRenderer({});
    $scope.getDirection = function() {
      // set direction
      var selectedMode = $scope.selectedOption.toUpperCase() || 'DRIVING',
          from = $scope.currPos || initialPos,
          request = {
              origin: from,
              destination: streetAddress,
              travelMode: selectedMode,
              provideRouteAlternatives: true,
              unitSystem: google.maps.UnitSystem.METRIC,
              optimizeWaypoints: true
          };
      if (selectedMode === 'TRANSIT') {
          request.transitOptions = {
              departureTime: new Date()
          };
      }

      directionsService.route(request, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
          } else {
              toastr.error(status);
          }
      });
    };

  });