define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('IntroCtrll', ['$scope','$location',
		function($scope, $location) {
			$scope.LoadMap = function() {
				$location.path('/map');
			};
		}
	]);
});