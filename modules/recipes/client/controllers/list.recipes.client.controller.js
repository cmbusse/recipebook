'use strict';

angular.module('recipes').controller('RecipesListController', ['$scope', 'RecipesService', '$state', 'Authentication', 'Admin', 'Users',
  function ($scope, RecipesService, $state, Authentication, Admin, Users) {
    $scope.authentication = Authentication;
    $scope.recipes = RecipesService.query();
    $scope.myRecipes = [];

    Admin.query(function (data) {
      $scope.users = data;
    });

    $scope.findCurrentUserID = function(){
    	$scope.$watch('users.length', function(newValue){
    		if(newValue > 0){
    			for(var i = 0; i < $scope.users.length; i++){
    				if($scope.authentication.user.email === $scope.users[i].email){
    					$scope.currentUserID = $scope.users[i]._id;
                        $scope.currentUser = $scope.users[i];
    				}
    			}
    		}
    	});
    };

    $scope.seedMyRecipes = function(){
    	// if user is signed in
    	if($scope.authentication.user){
    		$scope.$watch('users.length', function(newValue, oldValue){
    			// if users gets propogated
    			if(newValue > 0){
    				$scope.$watch('recipes.length', function(newValue, oldValue){
    					// if recipes gets propogated
			      	if(newValue > 0){
			      		if($scope.currentUserID){
			      			// if currentUserID has been set
			      			if(newValue !== oldValue){
			      				// Cycle through recipes and add all written by user to myRecipes
			      				for(var i = 0; i < $scope.recipes.length; i++){
							        if($scope.recipes[i].user){
                                        if($scope.recipes[i].user._id === $scope.currentUserID){
    							          $scope.myRecipes.push($scope.recipes[i]);
    							        }
                                    }
							      }
			      			}
						}
			      	}
			      });
    			}
    		});
    	}
    };

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

  }

]);