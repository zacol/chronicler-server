/* eslint-disable global-require, import/no-dynamic-require */

const mongoose = require('mongoose');

/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */
module.exports = function models(app) {
  // Connect to mongo
  mongoose.connect(app.get('config').mongoUrl, {
    db: { safe: true },
  });

  // Register `User` model
  require('./user');

  // Register `Meetup` model
  require('./meetup');
};
