const express = require('express');
const passport = require('passport');

const MeetupController = require('./controller');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    MeetupController.findAll
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    validateBody(schemas.requiredMeetupSchema),
    MeetupController.create
  );

router
  .route('/:meetupId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'meetupId'),
    MeetupController.findOne
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'meetupId'),
    validateBody(schemas.requiredMeetupSchema),
    MeetupController.update
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'meetupId'),
    validateBody(schemas.meetupSchema),
    MeetupController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'meetupId'),
    MeetupController.delete
  );

module.exports = router;
