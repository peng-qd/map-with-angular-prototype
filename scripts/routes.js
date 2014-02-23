define(['app'], function(app) {
	'use strict';
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/map', {templateUrl: '../views/home.html?v='+window.mySettings.buildNumber, controller: 'HomeCtrll'}).
			when('/report', {templateUrl: '../views/form.html?v='+window.mySettings.buildNumber, controller: 'FormCtrll'}).
			otherwise({redirectTo: '/'});
	}]);
});