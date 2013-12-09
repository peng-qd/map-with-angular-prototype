define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', 
		function($scope) {
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
			$scope.location = {};
			$scope.viewport = {};

			// When click the search button, the map will be changed to the chosen address
			$scope.searchAddress = function() {
				console.log('chosenPoleNumber: ' + $scope.chosenPoleNumber);
				console.log('viewport: ' + $scope.viewport);
				console.log('location: ' + $scope.location);

				if(!$.isEmptyObject($scope.viewport)) {
					$scope.myMap.fitBounds($scope.viewport);
				} else if(!$.isEmptyObject($scope.location)) {
					$scope.myMap.setCenter($scope.location);
					$scope.myMap.setZoom(17);
				} else {
					window.alert('no location is found!');
				}
			};
		}
	);
});