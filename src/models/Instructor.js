const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  biography: {
    type: String,
    required: [true, 'Please add a biography'],
    maxlength: [500, 'Biography cannot be more than 500 characters']
  },
  specialties: {
    type: [String],
    required: [true, 'Please add at least one specialty']
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience']
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Instructor', instructorSchema); 