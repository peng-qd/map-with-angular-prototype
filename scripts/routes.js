define(['app'], function(app) {
	'use strict';
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: '../views/home.html?v='+window.buildNumber, controller: 'HomeCtrll'}).
			when('/report', {templateUrl: '../views/form.html?v='+window.buildNumber, controller: 'FormCtrll'}).
			otherwise({redirectTo: '/'});
	}]);
});