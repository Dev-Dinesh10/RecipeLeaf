const express = require('express');
const { register, login, updateDetails } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
