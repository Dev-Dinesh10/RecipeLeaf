const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  description: { type: String },
  prepTime: { type: String },
  cookTime: { type: String },
  servings: { type: String },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'] 
  },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  tip: { type: String },
  imageUrl: { type: String },
  userIngredients: [{ type: String }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
