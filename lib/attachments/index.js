const routes = require('./routes');

/**
 * Expose attachments module.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function budgets(app) {
  // Attach routes to parent application
  app.use('/attachments', routes);
};
