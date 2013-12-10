define(['./module'], function (directives) {
	'use strict';
	directives.directive('googleplace', ['sharedData',function (sharedData) {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				var options = {
					types: ['geocode'], 
					componentRestrictions: { country: 'au'}
				};
				scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

				google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
					scope.$apply(function() {
						var place = scope.gPlace.getPlace();

						if(!place.geometry) {
							return;
						}
						
						if(place.geometry.viewport) {
							sharedData.setCurrentViewport(place.geometry.viewport);
						} else {
							sharedData.setCurrentLocation(place.geometry.location);
						}  
					});
				});
			}
		};
	}]);
});