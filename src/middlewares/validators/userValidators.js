const { body, param } = require('express-validator');

/**
 * Validation rules for creating a new user
 */
exports.createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  
  body('fitnessGoals')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Fitness goals cannot exceed 500 characters')
];

/**
 * Validation rules for logging in
 */
exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Validation rules for updating a user
 */
exports.updateUserValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('fitnessGoals')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Fitness goals cannot exceed 500 characters'),
  
  body('role')
    .optional()
    .isIn(['user', 'instructor', 'admin'])
    .withMessage('Role must be user, instructor, or admin')
];

/**
 * Validation rules for getting a user by ID
 */
exports.getUserValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
];

/**
 * Validation rules for deleting a user
 */
exports.deleteUserValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
]; 