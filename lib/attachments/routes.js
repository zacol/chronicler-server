const express = require('express');
const passport = require('passport');

const AttachmentController = require('./controller');
const upload = require('./multer');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    AttachmentController.findAll
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.array('files'),
    validateBody(schemas.requiredAttachmentSchema),
    AttachmentController.upload
  );

router
  .route('/:attachmentId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attachmentId'),
    AttachmentController.findOne
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'attachmentId'),
    AttachmentController.delete
  );

module.exports = router;
