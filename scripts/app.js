define([
    'angular',
    'angularRoute',
    'controllers/index',
    'directives/index',
    //'filters/index',
    'services/index',
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.controllers',
        'app.directives',
        //'app.filters',
        'app.services',
        'ngRoute'
    ]);
});