define(['./module'], function (directives) {
	'use strict';
	directives.directive('customselectbox', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				$(element).selectbox();
			}
		};
	});
});