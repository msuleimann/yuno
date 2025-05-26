const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const {
    propertyId,
    checkInDate,
    checkOutDate,
    guests,
    totalPrice,
    specialRequests,
    contactPhone,
  } = req.body;

  // Check if property exists
  const property = await Property.findById(propertyId);
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Check if property is available
  if (!property.isAvailable) {
    res.status(400);
    throw new Error('Property is not available for booking');
  }

  // Check if dates are valid
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  if (checkIn >= checkOut) {
    res.status(400);
    throw new Error('Check-out date must be after check-in date');
  }

  // Check if property is already booked for these dates
  const existingBooking = await Booking.findOne({
    property: propertyId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      {
        checkInDate: { $lte: checkOut },
        checkOutDate: { $gte: checkIn }
      }
    ]
  });

  if (existingBooking) {
    res.status(400);
    throw new Error('Property is already booked for the selected dates');
  }

  const booking = new Booking({
    user: req.user._id,
    property: propertyId,
    checkInDate,
    checkOutDate,
    guests,
    totalPrice,
    specialRequests,
    contactPhone,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('property');

  if (booking) {
    // Check if user is the booking owner or an admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to view this booking');
    }
    
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('property', 'name images address')
    .sort({ createdAt: -1 });
  
  res.json(bookings);
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (booking) {
    // Check if user is the booking owner or an admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this booking');
    }

    booking.status = status;

    if (status === 'cancelled') {
      booking.cancelledAt = Date.now();
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  updateBookingStatus,
};
