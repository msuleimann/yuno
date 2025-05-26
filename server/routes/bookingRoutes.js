const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookingById, 
  getMyBookings, 
  updateBookingStatus 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
