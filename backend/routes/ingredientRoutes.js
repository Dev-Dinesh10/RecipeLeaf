const express = require('express');
const router = express.Router();
const {
  getSuggestedIngredients,
  getAllIngredients,
  addIngredient
} = require('../controllers/ingredientController');

router.get('/suggestions', getSuggestedIngredients);
router.get('/', getAllIngredients);
router.post('/', addIngredient);

module.exports = router;
