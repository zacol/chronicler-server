const routes = require('./routes');

/**
 * Expose budgets module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function budgets(app) {
  // Attach routes to parent application
  app.use('/budgets', routes);
};
