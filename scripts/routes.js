define(['app'], function(app) {
	'use strict';
	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: '../views/home.html', controller: 'HomeCtrll'}).
			when('/report', {templateUrl: '../views/form.html', controller: 'FormCtrll'}).
			otherwise({redirectTo: '/'});
	}]);
});