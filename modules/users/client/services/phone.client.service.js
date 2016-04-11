'use strict';

// Service for creating confirmation codes based on user's phone number, used to verify user's phone number
angular.module('users').factory('confirmCodeFactory', ['Users', 
  function (Users) {
  	var service = {};
  	var _currentUser = {};
  	var _phone = '';

  	service.setCurrentUser = function(currentUser){
  		_currentUser = currentUser;
  		_phone = _currentUser.phoneAreaCode + _currentUser.phoneFirstThree + _currentUser.phoneLastFour;
  	};

  	service.getCurrentUser = function(){
  		return _currentUser;
  	};

  	service.getPhone = function(){
  		return _phone; 
  	};

  	service.createCode = function(){
	    var str = _phone.slice(0,5);
  		var retVal = '';
	    for(var i = 0; i < 5; i++){
				retVal += String.fromCharCode(((Number(str[i]) * (i + 1)) % 26) + 65);
	    }
	    return retVal;
  	};

  	service.testCode = function(enteredCode){
  		var confirmCode = service.createCode();
  		return confirmCode === enteredCode;
  	};

  	return service;
  }
]);

/*
   $scope.phoneConfirmed = $scope.confirmError = false;
    var str = $scope.currentUserPhone.slice(0,5);
    $scope.confirmCode = '';
    //var digits = [];
    for(var i = 0; i < 5; i++){
        //digits.push((Number(str[i]) * i) % 26);
        $scope.confirmCode += String.fromCharCode(((Number(str[i]) * (i + 1)) % 26) + 65);
    }
    if(this.enteredCode === $scope.confirmCode){
      //$scope.phoneConfirmed = true;
      $scope.confirmError = false;
      var user = new Users($scope.user);
      user.phoneVerified = true;
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
        $scope.phoneConfirmed = true;
        //$modalInstance.dismiss('cancel');
        //$location.url('/grocerylist');
      }, function (response) {
        $scope.error = response.data.message;
      });
    } else{
      $scope.phoneConfirmed = false;
      $scope.confirmError = true;
    }
*/

// Service for sending messages to the Twilio API
angular.module('users').factory('twilioFactory', ['$http', 
  function ($http) {
  	var service = {};
  	var _message = {};

  	service.setMessage = function(message){
  		_message = message;
  	};

  	service.sendMessage = function(){
  		$http.post('/api/twilio', _message).success(function (response) {
  			console.log('error in twilio.client.service.js');
  		}).error(function (response){
  			return response.message;
  		});
  	};

  	return service;
  }
]);