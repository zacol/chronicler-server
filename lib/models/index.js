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

  // Register `Attachment` model
  require('./attachment');

  // Register `Attendee` model
  require('./attendee');

  // Register `Budget` model
  require('./budget');

  // Register `Meetup` model
  require('./meetup');

  // Register `Room` model
  require('./room');

  // Register `User` model
  require('./user');
};
