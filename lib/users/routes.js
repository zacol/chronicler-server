const express = require('express');
const passport = require('passport');

const UserController = require('./controller');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.findAll
  );

router
  .route('/:userId')
  .get(passport.authenticate('jwt', { session: false }), UserController.findOne)
  .delete(
    passport.authenticate('jwt', { session: false }),
    UserController.delete
  );

module.exports = router;
