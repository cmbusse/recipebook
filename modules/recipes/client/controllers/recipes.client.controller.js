'use strict';

angular.module('recipes').controller('RecipesController', ['$scope', '$state', 'recipeResolve', 'Authentication', '$modal', '$log',   
  function ($scope, $state, recipe, Authentication, $modal, $log) {
    $scope.recipe = recipe;
    $scope.authentication = Authentication;
    $scope.error = null;
    $scope.form = {};

    if ($scope.recipe._id){
      $scope.ingredients = [];
      $scope.steps = [];
      for(var i = 0; i < $scope.recipe.ingredients.length; i++){
        $scope.ingredients.push($scope.recipe.ingredients[i]);
      }
      for(i = 0; i < $scope.recipe.steps.length; i++){
        $scope.steps.push($scope.recipe.steps[i]);
      }
    } else {
      $scope.ingredients = [{
        content: ''
      }];
      $scope.steps = [{
        content: ''
      }];
    }

    // TODO:  Implement up/down arrows, or possibly drag and drop if possible

    // Add ingredient to list
    $scope.addNewIngredient = function() {
      var newIngredient = {
        content: ''
      };
      $scope.ingredients.push(newIngredient);
    };

    // Add step to step list
    $scope.addNewStep = function() {
      var newStep = {
        content: ''
      };
      $scope.steps.push(newStep);
    };

    $scope.removeIngredient = function(index) {
      // If only one ingredient in list and its being removed, insert a blank ingredient in its place
      if($scope.ingredients.length === 1){
        var blankIngredient = {
          content: ''
        };
        $scope.ingredients[0] = blankIngredient;
      } else{
        var newIngredientArray = [];
        for(var i = 0; i < index; i++){
          var newIngredient = {
            content: $scope.ingredients[i].content
          };
          newIngredientArray.push(newIngredient);
        }
        for(i = index + 1; i < $scope.ingredients.length; i++){
          var newIngredient2 = {
            content: $scope.ingredients[i].content
          };
          newIngredientArray.push(newIngredient2);
        }
        $scope.ingredients = newIngredientArray;
      }
    };

    $scope.removeStep = function(index) {
      // If only one step in list and its being removed, insert a blank step in its place
      if($scope.steps.length === 1){
        var blankStep = {
          content: ''
        };
        $scope.steps[0] = blankStep;
      } else{
        var newStepArray = [];
        for(var i = 0; i < index; i++){
          var newStep = {
            content: $scope.steps[i].content
          };
          newStepArray.push(newStep);
        }
        for(i = index + 1; i < $scope.steps.length; i++){
          var newStep2 = {
            content: $scope.steps[i].content
          };
          newStepArray.push(newStep2);
        }
        $scope.steps = newStepArray;
      }
    };

    // Remove existing Article
    $scope.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        $scope.recipe.$remove($state.go('recipes.list'));
      }
    };

    // Save Article
    $scope.save = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '$scope.form.recipeForm');
        for(var i = 0; i < $scope.ingredients.length; i++){
          var ingredientString = '$scope.form.ingredientForm_' + i;
          $scope.$broadcast('show-errors-check-validity', ingredientString);
        }
        for(i = 0; i < $scope.steps.length; i++){
          var stepString = '$scope.form.stepForm_' + i;
          $scope.$broadcast('show-errors-check-validity', stepString);
        }
        return false;
      }

      // TODO: move create/update logic to service
      if ($scope.recipe._id) {
        $scope.recipe.ingredients = $scope.ingredients;
        $scope.recipe.steps = $scope.steps;
        $scope.recipe.$update(successCallback, errorCallback);
      } else {
        $scope.recipe.ingredients = $scope.ingredients;
        $scope.recipe.steps = $scope.steps;
        $scope.recipe.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('recipes.view', {
          recipeId: res._id
        });
      }

      function errorCallback(res) {
        $scope.error = res.data.message;
      }
    };

    // Modal Logic below
    $scope.items = $scope.ingredients;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]);

angular.module('recipes').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, Authentication, Users, Admin, $location) {
  // grab the auth user which doesn't incluce all fields of the user
  $scope.user = Authentication.user;
  // grab all users and set $scope.user as the version from all users
  Admin.query(function (data) {
    $scope.users = data;
    for(var i = 0; i < $scope.users.length; i++){
      if($scope.users[i].username === $scope.user.username){
        $scope.user.groceryList = $scope.users[i].groceryList;
      }
    }
  });
  // Our ingredients
  $scope.items = items;
  // Object that will hold all the ingredients selected to add to the grocery list
  $scope.selected = {
    items: []
  };
  // Closes the modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  // Adds items to grocery list
  $scope.addItemsToGroceryList = function () {
    $scope.success = $scope.error = null;

    var user = new Users($scope.user);
    // If user has no grocery list, make them an empty one
    if(!user.groceryList){
      user.groceryList = [];
    }

    // Cycles through selected ingredients and adds the content to the user's grocery list
    for(var i = 0; i < $scope.selected.items.length; i++){
      user.groceryList.push($scope.selected.items[i].content);
    }
    // Updates user, closes the modal, and redirects them to their grocery list
    user.$update(function (response) {
      $scope.success = true;
      Authentication.user = response;
      $modalInstance.dismiss('cancel');
      $location.url('/grocerylist');
    }, function (response) {
      $scope.error = response.data.message;
    });
    console.log('blip');
  };
});