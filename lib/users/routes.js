const express = require('express');
const passport = require('passport');

const UserController = require('./controller');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.findAll
  );

router
  .route('/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'userId'),
    UserController.findOne
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userSchema),
    UserController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'userId'),
    UserController.delete
  );

module.exports = router;
