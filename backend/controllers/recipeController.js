const Recipe = require('../models/Recipe');
const grokService = require('../services/grokService');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const imageService = require('../services/imageService');

// @desc    Generate recipe via AI
// @route   POST /api/recipes/generate
exports.generateRecipe = async (req, res, next) => {
  try {
    const { ingredients, cuisine } = req.body;

    const generatedData = await grokService.generateRecipe(ingredients, cuisine);
    
    // Generate AI Image
    const relativeImagePath = await imageService.generateImage(generatedData.name, cuisine, ingredients);
    
    // Construct full URL for mobile app
    const fullImageUrl = relativeImagePath.startsWith('http') 
      ? relativeImagePath 
      : `${req.protocol}://${req.get('host')}${relativeImagePath}`;

    const recipe = await Recipe.create({
      ...generatedData,
      user: req.user.id,
      userIngredients: ingredients,
      cuisine: cuisine,
      imageUrl: fullImageUrl
    });

    return successResponse(res, recipe, 'Recipe generated successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved recipes
// @route   GET /api/recipes
exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
    return successResponse(res, recipes, 'Recipes fetched successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return errorResponse(res, 'Recipe not found', 404);
    }
    return successResponse(res, recipe, 'Recipe fetched successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return errorResponse(res, 'Recipe not found', 404);
    }
    return successResponse(res, null, 'Recipe deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get recipes by cuisine
// @route   GET /api/recipes/cuisine/:cuisine
exports.getRecipesByCuisine = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      cuisine: { $regex: new RegExp(`^${req.params.cuisine}$`, 'i') }
    });
    return successResponse(res, recipes, 'Recipes fetched successfully');
  } catch (error) {
    next(error);
  }
};
