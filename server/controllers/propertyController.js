const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { 'address.city': { $regex: req.query.keyword, $options: 'i' } },
          { 'address.country': { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const typeFilter = req.query.type ? { type: req.query.type } : {};
  
  const count = await Property.countDocuments({ ...keyword, ...typeFilter });
  const properties = await Property.find({ ...keyword, ...typeFilter })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    properties,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate('owner', 'name email');

  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    price,
    capacity,
    amenities,
    images,
    features,
  } = req.body;

  const property = new Property({
    owner: req.user._id,
    name,
    type,
    description,
    address,
    price,
    capacity,
    amenities,
    images,
    features,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    price,
    capacity,
    amenities,
    images,
    features,
    isAvailable,
  } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    // Check if user is the owner or an admin
    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this property');
    }

    property.name = name || property.name;
    property.type = type || property.type;
    property.description = description || property.description;
    property.address = address || property.address;
    property.price = price || property.price;
    property.capacity = capacity || property.capacity;
    property.amenities = amenities || property.amenities;
    property.images = images || property.images;
    property.features = features || property.features;
    property.isAvailable = isAvailable !== undefined ? isAvailable : property.isAvailable;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    // Check if user is the owner or an admin
    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to delete this property');
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
