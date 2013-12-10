define(['./module'], function (services) {
    'use strict';
    services.factory('sharedData', function() {
    	var currentLocation = {};
    	var currentViewport = {};

    	return {
    		setCurrentLocation: function(value) {
    			currentLocation = value;
    			currentViewport = {};
    		},
    		setCurrentViewport: function(value) {
    			currentViewport = value;
    			currentLocation = {};
    		},
    		getLocationOrViewport: function() {
    			if(!$.isEmptyObject(currentViewport)) {
					return {type:'viewport',value:currentViewport};
				} else if(!$.isEmptyObject(currentLocation)) {
					return {type:'location',value:currentLocation};
				} else {
					return {type:'none',value:{}};
				}
    		}
    	};
    });
});