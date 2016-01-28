'use strict';

angular.module('users')
  .directive('passwordValidator', ['PasswordValidator', function(PasswordValidator) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.requirements = function (password) {
          var status = true;
          if (password) {
            /*
            * Old password validation, removed due to being overly complicated
            var result = PasswordValidator.getResult(password);
            var requirementsIdx = 0;

            // Requirements Meter - visual indicator for users
            var requirementsMeter = [
              { color: 'danger', progress: '20' },
              { color: 'warning', progress: '40' },
              { color: 'info', progress: '60' },
              { color: 'primary', progress: '80' },
              { color: 'success', progress: '100' }
            ];

            if (result.errors.length < requirementsMeter.length) {
              requirementsIdx = requirementsMeter.length - result.errors.length - 1;
            }

            scope.requirementsColor = requirementsMeter[requirementsIdx].color;
            scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;
            */
            // Validation now just checks if length of password is at least 6
            if (password.length < 6) {
              scope.popoverMsg = PasswordValidator.getPopoverMsg();
              scope.passwordError = 'Password must be 6 or more characters.';
              status = false;
            } else {
              scope.popoverMsg = '';
              scope.passwordError = [];
              status = true;
            }
          }
          return status;
        };
      }
    };
  }]);
