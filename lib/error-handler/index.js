/* eslint-disable no-unused-vars */

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText,
} = require('http-status-codes');

/**
 * Expose error handler.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function errorHandler(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error(getStatusText(NOT_FOUND));
    err.status = NOT_FOUND;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => {
    const status = err.status || INTERNAL_SERVER_ERROR;
    const error = app.get('env') === 'development' ? err : {};

    res.status(status).json({
      error: {
        message: error.message,
      },
    });
  });
};
