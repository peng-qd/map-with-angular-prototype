define([
	'angular',
	'app',
	'routes',
], function(ng) {
	'use strict';

	require(['domReady'], function(domReady) {
		domReady(function() {
			$('body').attr('ng-controller', 'RootCtrll')
			ng.bootstrap(document, ['app']);
		});
	});
});