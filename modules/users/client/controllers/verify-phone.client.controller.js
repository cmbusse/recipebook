'use strict';

angular.module('users').controller('VerifyPhoneController', ['$scope', 'Authentication', 'Users', '$modal', 'confirmCodeFactory', 'twilioFactory', 
  function ($scope, Authentication, Users, $modal, confirmCodeFactory, twilioFactory) {
    // GOTTA FIGURE OUT SOMETHING FOR WHAT HAPPENS IF THEY GO ON THE VERIFICATION PAGE AND THEY ARE ALREADY VERIFIED
    $scope.buildPage = function(){
      if(Authentication.user){
        Users.query(function (data){
          for(var i = 0; i < data.length; i++){
            if(Authentication.user.email === data[i].email){
              $scope.currentUser = data[i];
              $scope.pageBuilt = true;
            }
          }
        });
      }
    };

    $scope.sendConfirmationCode = function(){
      confirmCodeFactory.setCurrentUser($scope.currentUser);
      var message = {
        number: '+1' + confirmCodeFactory.getPhone(),
        code: confirmCodeFactory.createCode()
      };
      twilioFactory.setMessage(message);
      twilioFactory.sendMessage();
    };

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {});
    };

    
  }
]);

angular.module('users').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'Authentication', 'Users', 'confirmCodeFactory', 
  function ($scope, $modalInstance, Authentication, Users, confirmCodeFactory) {
  // grab all users and set $scope.currentUser as the version from all users
  $scope.buildPage = function(){
    Users.query(function (data) {
      for(var i = 0; i < data.length; i++){
        if(data[i].email === Authentication.user.email){
          $scope.currentUser = data[i];
          $scope.pageBuilt = true;
        }
      }
    });
  };

  $scope.testCode = function(){
    confirmCodeFactory.setCurrentUser($scope.currentUser);
    $scope.phoneConfirmed = $scope.confirmError = false;

    if(confirmCodeFactory.testCode(this.enteredCode)){
      // Code is correct
      $scope.confirmError = false;
        var user = new Users($scope.user);
        user.phoneVerified = true;
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
          $scope.phoneConfirmed = true;
        }, function (response) {
          $scope.error = response.data.message;
        });
    } else{
      $scope.phoneConfirmed = false;
      $scope.confirmError = true;
    }
  };

  // Closes the modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }
]);