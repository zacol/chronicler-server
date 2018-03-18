const express = require('express');
const passport = require('passport');

const { googlePlusJwt } = require('./jwt');

const router = express.Router();

// Google Plus Auth
router.get(
  '/google-plus',
  passport.authenticate('google-plus-token', { session: false }),
  googlePlusJwt
);

module.exports = router;
