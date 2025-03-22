const mongoose = require('mongoose');
const crypto = require('crypto');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d' // This will remove documents after 30 days
  },
  isRevoked: {
    type: Boolean,
    default: false
  }
});

// Generate a random token
refreshTokenSchema.statics.generateToken = function() {
  return crypto.randomBytes(40).toString('hex');
};

// Find token by token value
refreshTokenSchema.statics.findByToken = function(token) {
  return this.findOne({
    token,
    isRevoked: false,
    expires: { $gt: new Date() }
  });
};

// Revoke token
refreshTokenSchema.methods.revoke = function() {
  this.isRevoked = true;
  return this.save();
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema); 