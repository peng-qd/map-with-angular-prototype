define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('FormCtrll', ['$scope','sharedData',
		function($scope, sharedData) {
			$scope.markerAddress = sharedData.currentAddress;
			$scope.marker = sharedData.currentMarker;

			$scope.chosenPlace = '';

			$scope.mapOptions = {
				center: new google.maps.LatLng(window.mySettings.defaultLati, window.mySettings.defaultLongi),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDoubleClickZoom: true,  
				zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL }, 
				streetViewControl: false, 
				mapTypeControl: false
			};
		}
	]);
});