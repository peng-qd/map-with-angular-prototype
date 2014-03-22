define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('FormCtrll', ['$scope','sharedData','$location','$anchorScroll',
		function($scope, sharedData, $location, $anchorScroll, $rootScope) {
			$scope.markerAddress = sharedData.currentAddress;
			$scope.marker = sharedData.currentMarker;

			$scope.chosenPlace = '';
			$scope.chosenEquipment = '';
			$scope.chkValue = false;
			$scope.radValue = 'radio1';
			$scope.refInfo = '';

			$scope.email = '';

			$scope.mRadValue = true;

			//$location.hash('formTitle');
			//$anchorScroll();

			var old = $location.hash();
		    $location.hash('formTitle');
		    $anchorScroll();
		    //reset to old to keep any additional routing logic from kicking in
		    $location.hash(old);
			

			$scope.submitForm = function() {
				$scope.testform.email.$setValidity('required',!($scope.email.length == 0));
				console.log($scope.testform.$valid);

				//$location.hash('emailField');
				//$anchorScroll();
				var old = $location.hash();
			    $location.hash('emailField');
			    $anchorScroll();
			    //reset to old to keep any additional routing logic from kicking in
			    $location.hash(old);
			};
		}
	]);
});