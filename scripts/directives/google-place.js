define(['./module'], function (directives) {
	'use strict';
	directives.directive('googleplace', function () {
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

						//TODO: refactory this feature later, using scope variable here, 
						//so the directive has dependence with controller
						if(!place.geometry) {
							return;
						}
						
						if(place.geometry.viewport) {
							scope.viewport = place.geometry.viewport;
							scope.location = {};
						} else {
							scope.location = place.geometry.location;
							scope.viewport = {};
						}  
					});
				});
			}
		};
	});
});