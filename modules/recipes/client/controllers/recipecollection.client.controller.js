'use strict';

angular.module('recipes').controller('RecipeCollectionController', ['$scope', '$state', 'Authentication', 'RecipesService',
  function ($scope, $state, Authentication, RecipesService) {
    $scope.vari = 'hello';
    $scope.tester = RecipesService.query();
  }
]);