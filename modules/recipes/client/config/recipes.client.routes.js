(function () {
  'use strict';

  angular
    .module('recipes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('recipes', {
        abstract: true,
        url: '/recipes',
        template: '<ui-view/>'
      })
      .state('recipes.list', {
        url: '',
        templateUrl: 'modules/recipes/client/views/list-recipes.client.view.html'
        //controller: 'RecipesListController'
      })
      .state('recipes.create', {
        url: '/create',
        templateUrl: 'modules/recipes/client/views/form-recipe.client.view.html',
        controller: 'RecipesController',
        controllerAs: 'vm',
        resolve: {
          recipeResolve: newArticle
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('recipes.edit', {
        url: '/:recipeId/edit',
        templateUrl: 'modules/recipes/client/views/form-recipe.client.view.html',
        controller: 'RecipesController',
        controllerAs: 'vm',
        resolve: {
          recipeResolve: getArticle
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('recipes.view', {
        url: '/:recipeId',
        templateUrl: 'modules/recipes/client/views/view-recipe.client.view.html',
        controller: 'RecipesController',
        controllerAs: 'vm',
        resolve: {
          recipeResolve: getArticle
        }
      })
      .state('recipes.myrecipes', {
        url: '/myrecipes',
        templateUrl: 'modules/recipes/client/views/my-recipes.client.view.html',
        controller: 'RecipesListController',
        controllerAs: 'vm'
      })
      .state('recipes.myfavorites', {
        url: '/favorites',
        templateUrl: 'modules/recipes/client/views/favorites.client.view.html',
        controller: 'RecipesListController',
        controllerAs: 'vm'
      })
      .state('recipes.mybookmarks', {
        url: '/bookmarks',
        templateUrl: 'modules/recipes/client/views/bookmarks.client.view.html',
        controller: 'RecipesListController',
        controllerAs: 'vm'
      });
  }

  getArticle.$inject = ['$stateParams', 'RecipesService'];

  function getArticle($stateParams, RecipesService) {
    return RecipesService.get({
      recipeId: $stateParams.recipeId
    }).$promise;
  }

  newArticle.$inject = ['RecipesService'];

  function newArticle(RecipesService) {
    return new RecipesService();
  }
})();
