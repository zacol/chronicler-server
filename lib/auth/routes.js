const debug = require('debug')('chronicler:auth:routes');
const express = require('express');
const passport = require('passport');

const { googlePlusJwt } = require('./jwt');

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

// Google Plus Auth
router.get(
  '/auth/google-plus',
  passport.authenticate('google-plus-token', { session: false }),
  googlePlusJwt
);

// Secret resource
router.get('/secret', passport.authenticate('jwt', { session: false }), () => {
  console.log('Secret resource');
});

module.exports = router;
