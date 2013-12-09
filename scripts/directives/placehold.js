define(['./module'], function (directives) {
	'use strict';
	directives.directive('placehold', function () {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				var value;
      
				var placehold = function () {
					element.val(attrs.placehold)
				};
				var unplacehold = function () {
					element.val('');
				};

				scope.$watch(attrs.ngModel, function (val) {
					value = val || '';
				});

				element.bind('focus', function () {
 					if(value == '') unplacehold();
				});

				element.bind('blur', function () {
					if (element.val() == '') placehold();
				});

				model.$formatters.unshift(function (val) {
					if (!val) {
						placehold();
						value = '';
						return attrs.placehold;
					}
					return val;
				});
			}
		};
	});
});