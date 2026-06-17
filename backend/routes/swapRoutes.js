const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  sendRequest,
  getMyRequests,
  updateRequestStatus,
  getRequestById
} = require('../controllers/swapController');

// All routes protected
router.post('/', auth, sendRequest);
router.get('/my-requests', auth, getMyRequests);
router.put('/:id', auth, updateRequestStatus);
router.get('/:id', auth, getRequestById);

module.exports = router;