define([
	'angular',
	'app',
	'routes',
], function(ng) {
	'use strict';

	require(['domReady','gmaps','infobox'], function(domReady) {
		domReady(function() {
			$('body').attr('ng-controller', 'RootCtrll');
			init(ng);
		});
	});
});

// bootstrap the AuglarJS after Google API is loade and geo location is processed.
function init(ng) {
	
		if (navigator.geolocation) {
			console.log('browser supports geo location');
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log('use geo location, lati:' + position.coords.latitude);
					console.log('use geo location, longi:' + position.coords.longitude);

					window.mySettings.defaultLati = position.coords.latitude;
					window.mySettings.defaultLongi = position.coords.longitude;

					ng.bootstrap(document, ['app']);
				},
				function() {
					console.log('wait for 0.5 sec for retrieving geo location but failed');
					ng.bootstrap(document, ['app']);
				},
				{timeout:500}
			);
		} else {
			window.console.log('browser does not support geo location');
			ng.bootstrap(document, ['app']);
		}

}