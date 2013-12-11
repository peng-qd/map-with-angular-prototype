define(['./module'], function (directives) {
	'use strict';
	directives.directive('customSelectbox', function () {
		return {
			//restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				window.console.log('selectbox');
				//$(element).selectbox();
			}
		};
	});
});