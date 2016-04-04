'use strict';

angular.module('recipes').controller('RecipesListController', ['$scope', 
  function ($scope) {
    $scope.buildPage = function() {
      $scope.test = 'hello';
    };
        /*$scope.authentication = Authentication;
        $scope.recipes = RecipesService.query();
        $scope.myRecipes = [];

        $scope.$watch('recipes.$resolved', function(newValue, oldValue) {
            if(newValue === true){
                Admin.query(function (data) {
                    $scope.users = data;
                    $scope.findCurrentUserID();
                    $scope.seedMyRecipes();
                });
            }
        });
    };


    $scope.findCurrentUserID = function(){
    	for(var i = 0; i < $scope.users.length; i++){
    		if($scope.authentication.user.email === $scope.users[i].email){
    			$scope.currentUserID = $scope.users[i]._id;
                $scope.currentUser = $scope.users[i];
    		}
    	}
    };

    $scope.seedMyRecipes = function(){
    	for(var i = 0; i < $scope.recipes.length; i++){
            if($scope.recipes[i].user){
                if($scope.recipes[i].user._id === $scope.currentUserID){
                    $scope.myRecipes.push($scope.recipes[i]);
                }
            }
        }
    };
    /*
    $scope.testFunc = function(){
      $scope.success = $scope.error = null;
      $scope.currentUser.myFavorites.push('test');
      var user = new Users($scope.currentUser);
      user.$update(function (response) {
        //$scope.$broadcast('show-errors-reset', 'userForm');
        $scope.currentUser = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };

    // Boolean return for is logged in
    $scope.isLoggedIn = function() {
        if($scope.authentication.user){
            return true;
        } else{
            return false;
        }
    }; 
    */
  }
]);