const express = require('express');
const passport = require('passport');

const MeetupController = require('./controller');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    MeetupController.findAll
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    MeetupController.create
  );

router
  .route('/:meetupId')
  .get(
    passport.authenticate('jwt', { session: false }),
    MeetupController.findOne
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    MeetupController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    MeetupController.delete
  );

module.exports = router;
