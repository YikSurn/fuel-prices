'use strict';

/**
 * @ngdoc function
 * @name fuelPricesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuelPricesApp
 */
angular.module('fuelPricesApp')
  .controller('MainCtrl', function ($scope) {

    var mapCanvas = document.getElementById('googlemap');
    var mapOptions = {
      center: {lat: -37.814107, lng: 144.96328},
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
      position: {lat: -38, lng: 145},
      // map: map,
      animation: google.maps.Animation.DROP,
      title: 'Tooltip!',
      // label: "a"
    });

    var infowindow = new google.maps.InfoWindow({
      content: "HELLO NEXUSFUEL!"
    });

    // google.maps.event.addDomListener(window, 'load', initMap);
    marker.setMap(map);

    marker.addListener('click', showDetails);

    function showDetails() {
      infowindow.open(map, marker);
    };

  });
