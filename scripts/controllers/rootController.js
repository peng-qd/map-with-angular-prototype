define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('RootCtrll', 
		function($scope, $location) {
			// hide out the sublayouts out of ng-view
	        $scope.$on('$locationChangeStart', function(event, newVal, oldVal) {
	        	console.log('URL will be changed to: ' + $location.path());
	            if($location.path() != "/") {
	                $scope.showHomeComponent = false;
	            } else {
	                $scope.showHomeComponent = true;
	            }
	        });
		}
	);
});