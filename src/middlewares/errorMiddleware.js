const { ApiError } = require('../utils/errorHandler');
const logger = require('../config/logger');
const mongoose = require('mongoose');

/**
 * Custom error handler middleware
 * This middleware should be used as the last middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log the error
  logger.error(
    `${error.statusCode || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  
  // Log stack trace in development
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    const message = 'Resource not found';
    error = new ApiError(message, 404);
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = new ApiError(message, 409);
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    const message = errors.join(', ');
    error = new ApiError(message, 400);
  }
  
  // JWT token errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new ApiError(message, 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired, please refresh token';
    error = new ApiError(message, 401);
  }
  
  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler; 