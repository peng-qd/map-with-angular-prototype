define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', ['$scope','sharedData',
		function($scope, sharedData) {
			$scope.mapOptions = {
				center: new google.maps.LatLng(window.mySettings.defaultLati, window.mySettings.defaultLongi),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDoubleClickZoom: true,  
				zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL }, 
				streetViewControl: false, 
				mapTypeControl: false
			};

			$scope.chosenPlace = '';
			$scope.chosenPoleNumber = '';

			// When click the search button, the map will be changed to the chosen address
			$scope.searchAddress = function() {
				var result = sharedData.getLocationOrViewport();
				if(result.type == 'viewport') {
					$scope.myMap.fitBounds(result.value);
					$scope.myMap.setZoom(18);
				} else if(result.type == 'location') {
					$scope.myMap.setCenter(result.value);
					$scope.myMap.setZoom(18);
				} else {
					window.alert('no location is found!');
				}
			};
		}
	]);
});