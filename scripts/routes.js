define(['app'], function(app) {
	'use strict';
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/map', 
				{
					templateUrl: '../views/home.html?v='+window.mySettings.buildNumber, 
					controller: 'HomeCtrll',
					resolve: {
				        load: ['$q', '$rootScope', function ($q, $rootScope) {
				        	if(window.google) {
				        		return;
							}

				            var deferred = $q.defer();
				            /*
				            // At this point, use whatever mechanism you want 
				            // in order to lazy load dependencies. e.g. require.js
				            // In this case, "itemsController" won't be loaded
				            // until the user hits the '/items' route
				            require(['itemsController'], function () {
				                $rootScope.$apply(function () {
				                    deferred.resolve();
				                });
				            });
							*/

							require(['gmaps', 'infobox'], function() {
				                $rootScope.$apply(function () {
				                    deferred.resolve();
				                });

				                if (navigator.geolocation) {
									console.log('browser supports geo location');
									navigator.geolocation.getCurrentPosition(
										function(position) {
											console.log('use geo location, lati:' + position.coords.latitude);
											console.log('use geo location, longi:' + position.coords.longitude);

											window.mySettings.defaultLati = position.coords.latitude;
											window.mySettings.defaultLongi = position.coords.longitude;
										},
										function() {
											console.log('wait for 0.5 sec for retrieving geo location but failed');
										},
										{timeout:500}
									);
								} else {
									window.console.log('browser does not support geo location');
								}
							});
							
				            return deferred.promise;
				        }]
				    }
				}
			).
			when('/report', 
				{
					templateUrl: '../views/form.html?v='+window.mySettings.buildNumber, 
					controller: 'FormCtrll'
				}
			).
			otherwise({redirectTo: '/'});
	}]);
});