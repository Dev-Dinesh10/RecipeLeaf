const express = require('express');
const router = express.Router();
const { getAllCuisines } = require('../controllers/cuisineController');

router.get('/', getAllCuisines);

module.exports = router;
