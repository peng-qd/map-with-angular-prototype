define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('RootCtrll', 
		function($scope, $location) {
			$scope.showIntro = true;
			$scope.showHomeComponent = false;

			// hide out the sublayouts out of ng-view
	        $scope.$on('$locationChangeStart', function(event, newVal, oldVal) {
	        	if($location.url() == "") return;

	        	var pathTo = newVal.substring(newVal.indexOf('#') + 1);
	        	console.log('URL will be changed to the: ' + pathTo);

	        	if(pathTo == '/') {
	        		$scope.showIntro = true;
	        		$scope.showHomeComponent = false;
	        	} else if(pathTo == '/map') {
	                $scope.showHomeComponent = true;
	                $scope.showIntro = false;
	            } else {
	                $scope.showHomeComponent = false;
	                $scope.showIntro = false;
	            }
	        });
		}
	);
});