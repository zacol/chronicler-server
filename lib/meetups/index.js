const routes = require('./routes');

/**
 * Expose meetups module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function meetups(app) {
  // Attach routes to parent application
  app.use('/meetups', routes);
};
