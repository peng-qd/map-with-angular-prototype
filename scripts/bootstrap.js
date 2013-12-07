define([
	'angular',
	'app',
	'routes',
], function(ng) {
	'use strict';

	require(['domReady'], function(domReady) {
		domReady(function() {
			$('body').attr('ng-controller', 'RootCtrll');
		});
	});

	require(['async!http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true'], function() {
		ng.bootstrap(document, ['app']);
	});
});