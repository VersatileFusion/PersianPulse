const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  duration: {
    type: Number,
    required: [true, 'Please add class duration in minutes']
  },
  type: {
    type: String,
    enum: ['live', 'recorded'],
    required: [true, 'Please specify class type']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['yoga', 'cardio', 'strength', 'hiit', 'dance', 'pilates', 'other']
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  capacity: {
    type: Number,
    required: [true, 'Please add class capacity']
  },
  price: {
    type: Number,
    required: [true, 'Please add class price']
  },
  videoUrl: {
    type: String,
    required: function() { return this.type === 'recorded'; }
  },
  startTime: {
    type: Date,
    required: function() { return this.type === 'live'; }
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', classSchema); 