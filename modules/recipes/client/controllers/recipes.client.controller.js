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
    //vm.removeLastIngredient = removeLastIngredient;
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
        quantity: 0,
        unit: '',
        content: ''
      }];
      vm.steps = [{
        content: ''
      }];
    }

    // TODO:  Implement up/down arrows, or possibly drag and drop if possible
    // TODO:  Implement a way to delete an ingredient, extend this to steps as well

    // Add ingredient to list
    function addNewIngredient() {
      var newIngredient = {
        quantity: 0,
        unit: '',
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
