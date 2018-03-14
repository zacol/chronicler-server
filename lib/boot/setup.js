const bodyParser = require('body-parser');
const debug = require('debug')('chronicler:setup');
const passport = require('passport');

const config = require('../config');

/**
 * Expose configuration helper.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function configuration(app) {
  if (config('env') === 'development') {
    debug('development settings');
  }

  if (config('env') === 'testing') {
    debug('testing settings');
  }

  if (config('env') === 'production') {
    debug('production settings');
  }

  // Save config in app
  app.set('config', config);

  // Set app port
  app.set('port', app.get('config').port || 3000);

  // Configure native `Express` body parser - application/json
  app.use(bodyParser.json());

  // Use `Passport` setup & helpers middleware
  app.use(passport.initialize());

  // Set custom error handler
  app.use((err, req, res, next) => {
    debug('Some odd error: %j', err);
    next();
  });
};
