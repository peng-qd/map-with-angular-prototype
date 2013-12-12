define(['./module'], function (directives) {
	'use strict';
	directives.directive('icheck', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				var value;
				value = attrs['value'];

				scope.$watch(attrs['ngModel'], function(newValue){
				    $(element).iCheck('update');
				})

				return $(element).iCheck({
				    checkboxClass: 'icheckbox_minimal-grey',
				    radioClass: 'iradio_minimal-grey',
			    	hoverClass: 'none',
				}).on('ifChanged', function(event) {
				    if ($(element).attr('type') === 'checkbox' && attrs['ngModel']) {
				        scope.$apply(function() {
				            return model.$setViewValue(event.target.checked);
				        });
				    }
				    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
				        return scope.$apply(function() {
				            return model.$setViewValue(value);
				        });
				    }
				});
			}
		};
	});
});