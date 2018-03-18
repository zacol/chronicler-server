const express = require('express');
const passport = require('passport');

const UserController = require('./controller');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.getIndex
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    UserController.postIndex
  );

module.exports = router;
