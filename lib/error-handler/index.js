/* eslint-disable no-unused-vars */

/**
 * Expose error handler.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function errorHandler(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = app.get('env') === 'development' ? err : {};

    res.status(status).json({
      error: {
        message: error.message,
      },
    });
  });
};
