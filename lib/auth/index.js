const passport = require('./passport');
const routes = require('./routes');

/**
 * Expose login strategies and auth routes.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function auth(app) {
  // Instantiates `Passport` login strategies/
  passport(app);

  // Attach routes to parent application
  app.use('/auth', routes);
};
