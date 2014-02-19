define(['./module'], function (directives) {
	'use strict';
	directives.directive('mobileradiobutton', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				var value = attrs['value'];
				var noValue = $(element).data('not-selected');

				$(element).radiobutton({
					className: 'switch-off',
    				checkedClass: 'switch-on',
				}).on('change', function(event) {
				    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
				        return scope.$apply(function() {
				        	if($(element).attr('checked')) {
								return model.$setViewValue(value);
							} else {
								return model.$setViewValue(noValue);
							}
				        });
				    }
				});;
			}
		};
	});
});