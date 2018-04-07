const express = require('express');
const multer = require('multer');
const passport = require('passport');

const AttachmentController = require('./controller');
const { validateMimetypes, validateParam, schemas } = require('../validators');

const router = express.Router();
const upload = multer({
  dest: 'uploads/',
  fileFilter: validateMimetypes,
  limits: {
    fields: 1,
  },
});

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    AttachmentController.findAll
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.array('files'),
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
