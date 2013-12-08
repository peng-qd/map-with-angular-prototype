define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', 
		function($scope) {
			$scope.mapOptions = {
				center: new google.maps.LatLng(window.mySettings.defaultLati, window.mySettings.defaultLongi),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		}
	);
});