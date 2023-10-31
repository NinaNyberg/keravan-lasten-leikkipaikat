const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const PlaygroundSchema = new mongoose.Schema({
  playgroundName: {
    type: String,
    required: [true, 'Please add a playground name'],
    trim: true,
    maxlength: [30, 'PLayground name must be less than 30 chars']
  },
  address: {
    type: String,
    required: [true, 'Please, add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PlaygroundSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  this.address = undefined;
  next();
});

module.exports = mongoose.model('Playground', PlaygroundSchema);
