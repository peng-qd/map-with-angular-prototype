define(['./module'], function (directives) {
    'use strict';
    directives.directive('notAllowedCharacters', function () {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var notAllowedCharacters = ["<",">","{","}","(",")","[","]","'","\""];

                scope.$watch(attrs['ngModel'], function(newValue){
                    console.log(newValue);

                    for(var i = 0; i < notAllowedCharacters.length; i++) {
                        if(newValue.indexOf(notAllowedCharacters[i]) == -1) {
                            ctrl.$setValidity('notAllowedCharacters', true);
                            
                            return newValue;
                        } else {
                            ctrl.$setValidity('notAllowedCharacters', false);                    
                            
                            return undefined;
                        }
                    }
                });
            }
        };
    });
});