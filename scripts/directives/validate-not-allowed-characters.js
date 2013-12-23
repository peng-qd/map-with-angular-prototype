define(['./module'], function (directives) {
    'use strict';
    directives.directive('notallowedcharacters', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var notAllowedCharacters = ["<",">","{","}","(",")","[","]","'","\""];

                function validate() {
                    var newValue = model.$viewValue;

                    for(var i = 0; i < notAllowedCharacters.length; i++) {
                        if(newValue.indexOf(notAllowedCharacters[i]) === -1) {
                            model.$setValidity('notAllowedCharacters', true);
                            $(element).siblings('.not-allowed-message').remove();
                        } else {
                            model.$setValidity('notAllowedCharacters', false);   
                            $(element).after("<span class='not-allowed-message'>The text fields should not allow braces or quotes &lt;&gt;(){}[]&quot'</span>");
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