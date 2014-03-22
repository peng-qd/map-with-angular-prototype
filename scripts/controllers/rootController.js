define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('RootCtrll', 
		function($scope, $location, $anchorScroll) {
			$scope.showIntro = true;
			$scope.showHomeComponent = false;

			// hide out the sublayouts out of ng-view
	        $scope.$on('$routeChangeSuccess', function () {
	            var path = $location.path();

	            if(path == '/') {
	        		$scope.showIntro = true;
	        		$scope.showHomeComponent = false;
	        	} else if(path == '/map') {
	                $scope.showHomeComponent = true;
	                $scope.showIntro = false;
	            } else {
	                $scope.showHomeComponent = false;
	                $scope.showIntro = false;
	            }

	            console.log('URL change success to: ' + path);
	        });
		}
	);
});