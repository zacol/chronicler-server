const debug = require('debug')('chronicler:auth:routes');
const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Logs user out.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @api private
 */
function logout(req, res, next) {
  if (req.user) {
    debug('Log out user %s', req.user.id);
    req.logout();
  }

  next();
}

// Logout
router.get('/logout', logout, (req, res) => res.redirect('/'));

// Google Auth routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
