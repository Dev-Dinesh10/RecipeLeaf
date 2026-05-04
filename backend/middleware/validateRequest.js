const { body, validationResult } = require('express-validator');

const validateGenerateRecipe = [
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array'),
  body('cuisine')
    .isString()
    .notEmpty()
    .withMessage('Cuisine must be a non-empty string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateGenerateRecipe,
};
