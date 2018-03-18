const routes = require('./routes');

/**
 * Expose users module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function users(app) {
  // Attach routes to parent application
  app.use('/users', routes);
};
