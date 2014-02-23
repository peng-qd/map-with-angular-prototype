require.config({
	urlArgs: "v=" + window.mySettings.buildNumber,
	paths: {
		async: '/vendor/requirejs/async',
		angular: '/vendor/angularjs/angular',
		jquery: '/vendor/jquery-1.7.2.min',
		domReady: '/vendor/requirejs/domReady',
		angularRoute: '/vendor/angularjs/angular-route',
		ui_event: '/vendor/angularUI/event',
		ui_map: '/vendor/angularUI/ui-map',
		custom_select: '/vendor/jquery.selectbox.0.2.min',
		custom_radio: '/vendor/jquery.radiobutton.2.0',
		icheck: '/vendor/icheck/jquery.icheck.min',
		infobox: '/vendor/infobox',
	},
	shim: {
		angular: {
			deps: ['jquery','custom_select','icheck','custom_radio'],
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
		custom_select: {
			deps: ['jquery']
		},
		custom_radio: {
			deps: ['jquery']
		},
		icheck: {
			deps: ['jquery']
		},
		infobox: {
			deps: ['gmaps']
		}
	},

	deps: ['bootstrap']
});


// convert Google Maps into an AMD module
define('gmaps', ['async!http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places'], function() {
    return window.google.maps;
});
