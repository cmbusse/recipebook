(function () {
  'use strict';

  angular
    .module('recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$scope', '$state', 'recipeResolve', 'Authentication'];

  function RecipesController($scope, $state, recipe, Authentication) {
    var vm = this;

    vm.recipe = recipe;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.addNewIngredient = addNewIngredient;
    vm.addNewStep = addNewStep;
    vm.removeIngredient = removeIngredient;
    vm.removeStep = removeStep;

    if (vm.recipe._id){
      vm.ingredients = [];
      vm.steps = [];
      for(var i = 0; i < vm.recipe.ingredients.length; i++){
        vm.ingredients.push(vm.recipe.ingredients[i]);
      }
      for(i = 0; i < vm.recipe.steps.length; i++){
        vm.steps.push(vm.recipe.steps[i]);
      }
    } else {
      vm.ingredients = [{
        content: ''
      }];
      vm.steps = [{
        content: ''
      }];
    }

    // TODO:  Implement up/down arrows, or possibly drag and drop if possible

    // Add ingredient to list
    function addNewIngredient() {
      var newIngredient = {
        content: ''
      };
      vm.ingredients.push(newIngredient);
    }

    // Add step to step list
    function addNewStep() {
      var newStep = {
        content: ''
      };
      vm.steps.push(newStep);
    }

    function removeIngredient(index) {
      // If only one ingredient in list and its being removed, insert a blank ingredient in its place
      if(vm.ingredients.length === 1){
        var blankIngredient = {
          content: ''
        };
        vm.ingredients[0] = blankIngredient;
      } else{
        var newIngredientArray = [];
        for(var i = 0; i < index; i++){
          var newIngredient = {
            content: vm.ingredients[i].content
          };
          newIngredientArray.push(newIngredient);
        }
        for(i = index + 1; i < vm.ingredients.length; i++){
          var newIngredient2 = {
            content: vm.ingredients[i].content
          };
          newIngredientArray.push(newIngredient2);
        }
        vm.ingredients = newIngredientArray;
      }
    }

    function removeStep(index) {
      // If only one step in list and its being removed, insert a blank step in its place
      if(vm.steps.length === 1){
        var blankStep = {
          content: ''
        };
        vm.steps[0] = blankStep;
      } else{
        var newStepArray = [];
        for(var i = 0; i < index; i++){
          var newStep = {
            content: vm.steps[i].content
          };
          newStepArray.push(newStep);
        }
        for(i = index + 1; i < vm.steps.length; i++){
          var newStep2 = {
            content: vm.steps[i].content
          };
          newStepArray.push(newStep2);
        }
        vm.steps = newStepArray;
      }
    }

    // Remove existing Article
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.recipe.$remove($state.go('recipes.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.recipeForm');
        for(var i = 0; i < vm.ingredients.length; i++){
          var ingredientString = 'vm.form.ingredientForm_' + i;
          $scope.$broadcast('show-errors-check-validity', ingredientString);
        }
        for(i = 0; i < vm.steps.length; i++){
          var stepString = 'vm.form.stepForm_' + i;
          $scope.$broadcast('show-errors-check-validity', stepString);
        }
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.recipe._id) {
        vm.recipe.ingredients = vm.ingredients;
        vm.recipe.steps = vm.steps;
        vm.recipe.$update(successCallback, errorCallback);
      } else {
        vm.recipe.ingredients = vm.ingredients;
        vm.recipe.steps = vm.steps;
        vm.recipe.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('recipes.view', {
          recipeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
