const Ingredient = require('../models/Ingredient');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc    Get suggested ingredients list
// @route   GET /api/ingredients/suggestions
exports.getSuggestedIngredients = async (req, res, next) => {
  try {
    const suggestions = [
      'chicken', 'rice', 'tomato', 'onion', 'garlic', 'potato',
      'egg', 'cheese', 'pasta', 'spinach', 'ginger', 'lemon',
      'paneer', 'mushroom', 'carrot', 'bell pepper'
    ];
    return successResponse(res, suggestions, 'Suggested ingredients fetched successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Add new ingredient
// @route   POST /api/ingredients
exports.addIngredient = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name) {
      return errorResponse(res, 'Ingredient name is required', 400);
    }

    const ingredient = await Ingredient.create({ name, category });
    return successResponse(res, ingredient, 'Ingredient added successfully', 201);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 'Ingredient already exists', 400);
    }
    next(error);
  }
};

// @desc    Get all ingredients
// @route   GET /api/ingredients
exports.getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find().sort({ name: 1 });
    return successResponse(res, ingredients, 'Ingredients fetched successfully');
  } catch (error) {
    next(error);
  }
};
