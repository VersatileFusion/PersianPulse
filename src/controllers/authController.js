const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const RefreshToken = require('../models/RefreshToken');
const logger = require('../config/logger');
const { 
  BadRequestError, 
  UnauthorizedError, 
  NotFoundError 
} = require('../utils/errorHandler');

/**
 * Generate JWT access token
 */
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m'
  });
};

/**
 * Generate refresh token and save to database
 */
const generateRefreshToken = async (userId, req) => {
  // Create a new refresh token
  const token = RefreshToken.generateToken();
  
  // Get expiry date based on environment variable or default to 30 days
  const expiryDays = parseInt(process.env.JWT_REFRESH_EXPIRE) || 30;
  const expires = new Date();
  expires.setDate(expires.getDate() + expiryDays);
  
  // Save token to database
  await RefreshToken.create({
    token,
    user: userId,
    userAgent: req.headers['user-agent'] || 'Unknown',
    ip: req.ip,
    expires
  });
  
  return token;
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check for user
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id, req);
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        fitnessGoals: user.fitnessGoals,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new BadRequestError('Refresh token is required');
    }
    
    // Find the refresh token in the database
    const refreshTokenDoc = await RefreshToken.findByToken(refreshToken);
    
    if (!refreshTokenDoc) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
    
    // Get the user
    const user = await User.findById(refreshTokenDoc.user).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    // Generate new tokens
    const accessToken = generateAccessToken(user._id);
    const newRefreshToken = await generateRefreshToken(user._id, req);
    
    // Revoke old refresh token
    await refreshTokenDoc.revoke();
    
    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    logger.error(`Error refreshing token: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new BadRequestError('Refresh token is required');
    }
    
    // Find the refresh token in the database
    const refreshTokenDoc = await RefreshToken.findByToken(refreshToken);
    
    if (refreshTokenDoc) {
      // Revoke the token
      await refreshTokenDoc.revoke();
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Error during logout: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error(`Error getting user profile: ${error.message}`);
    next(error);
  }
}; 