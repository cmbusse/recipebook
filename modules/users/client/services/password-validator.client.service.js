'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    // Old password validation removed due to being over complicated
    // var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      /*
       * Old password validation removed due to being over complicated
      getResult: function (password) {
        //result is the return of the owaspPasswordStrengthTest.test, if we want to customize the test we run, we want to avoid the owasp
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      */
      getPopoverMsg: function () {
        var popoverMsg = 'Please enter a passphrase or password with 6 or more characters.';
        return popoverMsg;
      }
    };
  }
]);
