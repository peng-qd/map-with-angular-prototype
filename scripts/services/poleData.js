define(['./module'], function (services) {
    'use strict';
    services.factory('poleData', ['$http', 'sharedData', function($http, sharedData) {
        var baseUrl = "http://localhost:50250/Streetlights.aspx/";
    	return {
    		getPoles: function(container) {
                var result;
                $http({
                    url: baseUrl + "GetAssets",
                    method: 'post',
                    data: container
                }).success(function(data, status, headers, config) {
                    return {status: status, data: data};
                }).error(function(data, status, headers, config) {
                    return {status: status, data: data};
                });
            },
            getPole: function() {

            }
    	};
    }]);
});