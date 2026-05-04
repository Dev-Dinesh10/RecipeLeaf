const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  emoji: { type: String },
});

module.exports = mongoose.model('Cuisine', CuisineSchema);
