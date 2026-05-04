const express = require('express');
const router = express.Router();
const {
  generateRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  getRecipesByCuisine
} = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');
const { validateGenerateRecipe } = require('../middleware/validateRequest');

router.post('/generate', protect, validateGenerateRecipe, generateRecipe);
router.get('/', protect, getAllRecipes);
router.get('/cuisine/:cuisine', protect, getRecipesByCuisine);
router.get('/:id', protect, getRecipeById);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
