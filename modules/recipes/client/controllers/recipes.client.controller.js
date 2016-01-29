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
        vm.recipe.$update(successCallback, errorCallback);
      } else {
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
