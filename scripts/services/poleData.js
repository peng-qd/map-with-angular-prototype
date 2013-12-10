define(['./module'], function (services) {
    'use strict';
    services.factory('poleData', function($http) {
        var baseUrl = '/data/';
        var poleService = {
            getPoles: function(container) {
                var promise = $http
                    .post(baseUrl + 'poles.json', container)
                    .then(function(response) {
                        console.log(response);
                        return response.data;
                    }
                );
                return promise;
            }
        };

        return poleService;
    });
});