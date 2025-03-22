const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const logger = require('../config/logger');
const { 
  NotFoundError, 
  BadRequestError, 
  UnauthorizedError, 
  ConflictError 
} = require('../utils/errorHandler');

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m'
  });
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get single user
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error(`Error fetching user ${req.params.id}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Create new user
 * @route   POST /api/users
 * @access  Public
 */
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, fitnessGoals } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      fitnessGoals
    });
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        fitnessGoals: user.fitnessGoals,
        token
      }
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res, next) => {
  try {
    // Only allow updating certain fields
    const { name, email, fitnessGoals, role } = req.body;
    const fieldsToUpdate = { name, email, fitnessGoals, role };
    
    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );
    
    // Check if user with this email already exists
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        throw new ConflictError('User with this email already exists');
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error(`Error updating user ${req.params.id}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    await user.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Error deleting user ${req.params.id}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    User login
 * @route   POST /api/users/login
 * @access  Public
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate email & password
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password');
    }
    
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
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        fitnessGoals: user.fitnessGoals,
        token
      }
    });
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    next(error);
  }
}; 