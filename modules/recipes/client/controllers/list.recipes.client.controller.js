'use strict';

angular.module('recipes').controller('RecipesListController', ['$scope', 'RecipesService', '$state', 'Authentication',
	function ($scope, RecipesService, $state, Authentication) {
		$scope.authentication = Authentication;
		$scope.vari = 'hello';
		$scope.recipes = RecipesService.query();
		$scope.myRecipes = [];

		$scope.seedMyRecipes = function(){
			$scope.recipes = RecipesService.query();
			$scope.myRecipes = [];
			for(var i = 0; i < $scope.recipes.length; i++){
				if($scope.recipes[i].user._id === $scope.authentication.user._id){
					$scope.myRecipes.push($scope.recipes[i]);
				}
			}
		};

		$scope.testFunc = function(){
			console.log('bing');
		};
	}
]);