const { validationResult } = require('express-validator');
const logger = require('../../config/logger');

/**
 * Middleware to handle validation errors
 * This will check for validation errors and return a formatted response
 */
exports.validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors for response
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg
    }));

    // Log validation errors
    logger.error(`Validation error: ${JSON.stringify(formattedErrors)}`);

    // Return error response
    return res.status(400).json({
      success: false,
      errors: formattedErrors
    });
  };
}; 