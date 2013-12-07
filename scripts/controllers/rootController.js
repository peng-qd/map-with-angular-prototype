define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('RootCtrll', 
		function($scope, $location) {
			// hide out the sublayouts out of ng-view
	        $scope.$on('$locationChangeStart', function(event, newVal, oldVal) {
	        	if($location.url() == "") return;

	        	var pathTo = newVal.substring(newVal.indexOf('#') + 1);
	        	console.log('URL will be changed to the: ' + pathTo);
	            if(pathTo != '/') {
	                $scope.showHomeComponent = false;
	            } else {
	                $scope.showHomeComponent = true;
	            }
	        });
		}
	);
});