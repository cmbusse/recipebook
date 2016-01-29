(function (app) {
  'use strict';

  app.registerModule('recipes');
  app.registerModule('recipes.services');
  app.registerModule('recipes.routes', ['ui.router', 'recipes.services']);
})(ApplicationConfiguration);
