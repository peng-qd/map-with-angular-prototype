require.config({
	urlArgs: "v=" + window.mySettings.buildNumber,
	paths: {
		async: '/vendor/requirejs/async',
		angular: '/vendor/angularjs/angular',
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
		domReady: '/vendor/requirejs/domReady',
		angularRoute: '/vendor/angularjs/angular-route',
		ui_event: '/vendor/angularUI/event',
		ui_map: '/vendor/angularUI/ui-map',
	},
	shim: {
		angular: {
			deps: ['jquery'],
			exports: 'angular'
		},
		angularRoute: {
			deps: ['angular']
		},
		ui_event: {
			deps: ['angular']
		},
		ui_map: {
			deps: ['ui_event']
		},
	},

	deps: ['bootstrap']
});