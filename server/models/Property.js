const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['room', 'house', 'apartment', 'villa'],
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      zipCode: { type: String },
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      adults: { type: Number, required: true, default: 1 },
      children: { type: Number, default: 0 },
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    features: {
      bedrooms: { type: Number, required: true, default: 1 },
      bathrooms: { type: Number, required: true, default: 1 },
      area: { type: Number }, // in square meters
    }
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
