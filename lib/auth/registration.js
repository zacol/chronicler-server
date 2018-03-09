const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * Google Registration.
 *
 * @param {Object} profile `Passport` profile.
 * @param {Function} fn Callback accepting `err` and `user`.
 * @api public
 */
exports.google = function google(profile, fn) {
  const user = new User();

  user.firstName = profile.name.givenName;
  user.lastName = profile.name.familyName;
  user.email = profile.emails[0].value;
  user.profiles.google = profile;

  user.save(err => fn(err, user));
};
