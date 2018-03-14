const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * Google Plus Registration.
 *
 * @param {Object} profile `Passport` profile.
 * @api public
 */
exports.googlePlus = function googlePlus(profile) {
  const user = new User();

  user.firstName = profile.name.givenName;
  user.lastName = profile.name.familyName;
  user.email = profile.emails[0].value;
  user.profiles[profile.provider] = profile;

  user.save();

  return user;
};
