const express = require('express');
const passport = require('passport');

const UserController = require('./controller');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.findAllUsers
  );

router
  .route('/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.findOneUser
  );

router
  .route('/:userId/meetups')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.findAllMeetups
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    UserController.createMeetup
  );

module.exports = router;
