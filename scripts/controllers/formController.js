define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('FormCtrll', ['$scope','sharedData','anchorScroll',
		function($scope, sharedData, anchorScroll) {
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
			anchorScroll.toView('#formTitle', true);

			$scope.submitForm = function() {
				$scope.testform.email.$setValidity('required',!($scope.email.length == 0));
				console.log($scope.testform.$valid);

				//$location.hash('emailField');
				//$anchorScroll();
				anchorScroll.toView('#emailField', true);
			};
		}
	]);
});