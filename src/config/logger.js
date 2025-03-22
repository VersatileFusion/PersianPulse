const winston = require('winston');
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize, align } = format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create logger
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    align(),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        align(),
        logFormat
      )
    }),
    new transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  exitOnError: false
});

// Create a stream object for Morgan
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger; 