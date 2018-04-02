const routes = require('./routes');

/**
 * Expose rooms module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function rooms(app) {
  // Attach routes to parent application
  app.use('/rooms', routes);
};
