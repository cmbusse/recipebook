'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ingredient = mongoose.model('Ingredient'),
  Recipe = mongoose.model('Recipe'),
  Step = mongoose.model('Step'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an recipe
 */
exports.create = function (req, res) {
  //var recipe = new Recipe(req.body);
  //recipe.user = req.user;
  var entry = req.body;

  // Creating array of IngredientSchema items
  var ingredientsArray = [];
  for(var i = 0; i < entry.ingredients.length; i++){
    var ingredient = new Ingredient({
      content: entry.ingredients[i].content
    });
    ingredientsArray.push(ingredient);
  }

  // Creating array of Strings for Steps
  var stepsArray = [];
  for(i = 0; i < entry.steps.length; i++){
    var step = new Step({
      content: entry.steps[i].content
    });
    stepsArray.push(step);
  }

  // Creating a new RecipeSchema item from components
  var newRecipe = {
    title: entry.title,
    ingredients: ingredientsArray,
    steps: stepsArray,
    prepTime: entry.prepTime,
    cookTime: entry.cookTime,
    numServings: entry.numServings,
    description: entry.description
    //profileImageURL: entry.profileImageURL
  };

  var recipe = new Recipe(newRecipe);
  recipe.user = req.user;

  recipe.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipe);
    }
  });
};

/**
 * Show the current recipe
 */
exports.read = function (req, res) {
  res.json(req.recipe);
};

/**
 * Update an recipe
 */
exports.update = function (req, res) {
  var recipe = req.recipe;
  // TODO:  Why doesn't req.recipe give us everything we need, and why do we need the req.body stuff?
  recipe.title = req.body.title;
  recipe.ingredients = req.body.ingredients;
  recipe.steps = req.body.steps;
  recipe.prepTime = req.body.prepTime;
  recipe.cookTime = req.body.cookTime;
  recipe.numServings = req.body.numServings;
  recipe.description = req.body.description;
  recipe.imageUrl = req.body.imageUrl;

  recipe.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipe);
    }
  });
};

/**
 * Delete an recipe
 */
exports.delete = function (req, res) {
  var recipe = req.recipe;

  recipe.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipe);
    }
  });
};

/**
 * List of Recipes
 */
exports.list = function (req, res) {
  Recipe.find().sort('-created').populate('user', 'displayName').exec(function (err, recipes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipes);
    }
  });
};

/**
 * Recipe middleware
 */
exports.recipeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Recipe is invalid'
    });
  }

  Recipe.findById(id).populate('user', 'displayName').exec(function (err, recipe) {
    if (err) {
      return next(err);
    } else if (!recipe) {
      return res.status(404).send({
        message: 'No recipe with that identifier has been found'
      });
    }
    req.recipe = recipe;
    next();
  });
};
