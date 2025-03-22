/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.isOperational = true; // Used to distinguish operational errors from programming errors
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error (404)
 */
class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Bad Request Error (400)
 */
class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

/**
 * Unauthorized Error (401)
 */
class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Forbidden Error (403)
 */
class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

/**
 * Conflict Error (409)
 */
class ConflictError extends ApiError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

/**
 * Internal Server Error (500)
 */
class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError
}; 