const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const logger = require('../config/logger');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        logger.error('User not found with this token');
        return res.status(401).json({
          success: false,
          error: 'Not authorized, user not found'
        });
      }

      next();
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      
      // Check if error is due to token expiration
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token expired, please refresh token',
          isExpired: true
        });
      }
      
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    logger.error('No token provided');
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }
};

// Middleware to check user role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.error(`User ${req.user.id} is not authorized to access this route with role ${req.user.role}`);
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
}; 