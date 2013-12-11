define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('FormCtrll', ['$scope','sharedData',
		function($scope, sharedData) {
			$scope.markerAddress = sharedData.currentAddress;
			$scope.marker = sharedData.currentMarker;
		}
	]);
});