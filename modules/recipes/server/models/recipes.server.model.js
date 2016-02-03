'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ingredient Schema
 */
var IngredientSchema = new Schema({
  quantity: {
    type: String,
    deafult: '',
    trim: true,
    required: 'Quantity cannot be blank'
  },
  unit: {
    type: String,
    default: '',
    trim: true,
    required: 'Unit cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content cannot be blank'
  }
});

/**
 * Step Schema
 */
var StepSchema = new Schema({
  content: {
    type: String,
    required: 'Step cannot be blank'
  }
});

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  ingredients: [IngredientSchema],
  steps: [StepSchema],
  prepTime: {
    type: String,
    default: '',
    trim: true,
    required: 'Prep Time cannot be blank'
  },
  cookTime: {
    type: String,
    default: '',
    trim: true,
    required: 'Cook Time cannot be blank' 
  },
  numServings: {
    type: String,
    default: '',
    trim: true,
    required: 'Number of Servings cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  imageURL: {
    type: String,
    default: 'modules/recipes/client/img/photography111.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Recipe', RecipeSchema);
mongoose.model('Ingredient', IngredientSchema);
mongoose.model('Step', StepSchema);