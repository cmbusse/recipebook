(function () {
  'use strict';

  angular
    .module('recipes.services')
    .factory('RecipesService', RecipesService);

  RecipesService.$inject = ['$resource'];

  function RecipesService($resource) {
    return $resource('api/recipes/:recipeId', {
      recipeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
