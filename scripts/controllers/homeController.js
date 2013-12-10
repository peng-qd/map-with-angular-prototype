define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', ['$scope','sharedData','poleData',
		function($scope, sharedData, poleData) {
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
			$scope.isLoading = false;
			$scope.polesResult = {};

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

			// When zoom > 17, display the poles
			$scope.setMarkers = function(zoom) {
				console.log('Zoom now is: ' + zoom);
				if(zoom > 17) {
					$scope.isLoading = true;
					var bounds = $scope.myMap.getBounds();
		            var ne = bounds.getNorthEast();
		            var sw = bounds.getSouthWest();
		            var viewbox = { "bottomleft": { "lat": sw.lat(), "lng": sw.lng() }, "topright": { "lat": ne.lat(), "lng": ne.lng()} };
					$scope.polesResult = poleData.getPoles({ box: viewbox });
					if($scope.polesResult.status != 200) {
						console.log('Get poles failed: ' + $scope.polesResult.status);
					}
				}
			}
		}
	]);
});