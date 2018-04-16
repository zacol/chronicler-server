const express = require('express');
const passport = require('passport');

const AttendeeController = require('./controller');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    AttendeeController.find
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    validateBody(schemas.requiredAttendeeSchema),
    AttendeeController.insert
  );

router
  .route('/:attendeeId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attendeeId'),
    AttendeeController.get
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attendeeId'),
    validateBody(schemas.requiredAttendeeSchema),
    AttendeeController.update
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attendeeId'),
    validateBody(schemas.attendeeSchema),
    AttendeeController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attendeeId'),
    AttendeeController.delete
  );

module.exports = router;
