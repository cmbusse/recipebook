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
    type: Number,
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
  authorLastName: {
    type: String,
    trim: true
  },
  authorFirstName: {
    type: String,
    trim: true
  },
  profileImageURL: {
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