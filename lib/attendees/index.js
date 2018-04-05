const routes = require('./routes');

/**
 * Expose attendees module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function attendees(app) {
  // Attach routes to parent application
  app.use('/attendees', routes);
};
