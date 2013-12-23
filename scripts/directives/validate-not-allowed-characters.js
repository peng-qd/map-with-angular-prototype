define(['./module'], function (directives) {
    'use strict';
    directives.directive('notallowedcharacters', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, model) {
                var notAllowedCharacters = ["<",">","{","}","(",")","[","]","'","\""];

                function validate() {
                    var newValue = model.$viewValue;
                    console.log(newValue);

                    for(var i = 0; i < notAllowedCharacters.length; i++) {
                        if(newValue.indexOf(notAllowedCharacters[i]) === -1) {
                            model.$setValidity('notAllowedCharacters', true);
                        } else {
                            model.$setValidity('notAllowedCharacters', false);   
                            break;              
                        }
                    }
                }

                scope.$watch( function() {
                    return model.$viewValue;
                }, validate);
            }
        };
    });
});