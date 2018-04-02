const express = require('express');
const passport = require('passport');

const RoomController = require('./controller');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), RoomController.findAll)
  .post(
    passport.authenticate('jwt', { session: false }),
    validateBody(schemas.requiredRoomSchema),
    RoomController.create
  );

router
  .route('/:meetupId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'roomId'),
    RoomController.findOne
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'roomId'),
    validateBody(schemas.roomSchema),
    RoomController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'roomId'),
    RoomController.delete
  );

module.exports = router;