const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById
} = require('../controllers/userController');

// Protected routes - need login token
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;