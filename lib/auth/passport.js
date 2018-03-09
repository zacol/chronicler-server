const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const registration = require('./registration');

const User = mongoose.model('User');

/**
 * Expose Passport login strategies.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

module.exports = function LoginStrategies(app) {
  // Passport Serialization of logged User to Session from request
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Passport Deserialization of logged User by Session into request
  passport.deserializeUser((userId, done) => {
    User.findById(userId).exec((err, user) => {
      done(null, user);
    });
  });

  // Register Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: app.get('config').auth.google.clientID,
        clientSecret: app.get('config').auth.google.clientSecret,
        callbackURL: app.get('config').auth.google.callback,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findByProvider(profile, (err, existingUser) => {
          if (err) {
            return done(err);
          }

          if (existingUser) {
            return done(null, existingUser);
          }

          registration.google(profile, (err, registeredUser) =>
            done(err, registeredUser)
          );

          return true;
        });
      }
    )
  );
};
