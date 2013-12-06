require.config({
	paths: {
		angular: '/vendor/angular',
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
		domReady: '/vendor/domReady',
		angularRoute: '/vendor/angular-route',
	},
	shim: {
		angular: {
			deps: ['jquery'],
			exports: 'angular'
		},
		angularRoute: {
			deps: ['angular']
		}
	},

	deps: ['bootstrap']
});