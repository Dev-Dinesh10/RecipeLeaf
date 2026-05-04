const Cuisine = require('../models/Cuisine');
const { successResponse } = require('../utils/responseHelper');

// @desc    Get all cuisines
// @route   GET /api/cuisines
exports.getAllCuisines = async (req, res, next) => {
  try {
    console.log('--- Fetching Cuisines Request Received ---');
    let cuisines = await Cuisine.find();
    
    // Seed if empty
    if (cuisines.length === 0) {
      const defaultCuisines = [
        { id: 'indian', label: 'Indian', emoji: '🍛' },
        { id: 'italian', label: 'Italian', emoji: '🍝' },
        { id: 'chinese', label: 'Chinese', emoji: '🥢' },
        { id: 'mexican', label: 'Mexican', emoji: '🌮' },
        { id: 'japanese', label: 'Japanese', emoji: '🍱' },
        { id: 'thai', label: 'Thai', emoji: '🍜' },
        { id: 'mediterranean', label: 'Mediterranean', emoji: '🫒' },
        { id: 'american', label: 'American', emoji: '🍔' },
      ];
      cuisines = await Cuisine.insertMany(defaultCuisines);
    }
    
    return successResponse(res, cuisines, 'Cuisines fetched successfully');
  } catch (error) {
    next(error);
  }
};
