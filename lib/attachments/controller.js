const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const Attachment = require('../models/attachment');
const config = require('../config');
const { findDocuments, getDocument } = require('../utils');

module.exports = {
  find: (req, res, next) => {
    try {
      findDocuments(req, res, Attachment, config);
    } catch (err) {
      next(err);
    }
  },

  get: (req, res, next) => {
    try {
      getDocument(req, res, Attachment);
    } catch (err) {
      next(err);
    }
  },

  insert: async (req, res, next) => {
    try {
      const { files } = req;

      const newFiles = files.map(
        file =>
          new Attachment({
            ...file,
            ...req.value.body,
          })
      );

      await Attachment.create(newFiles);

      res.status(CREATED).json(newFiles);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { attachmentId } = req.value.params;
      const attachment = await Attachment.findByIdAndRemove(attachmentId);

      if (!attachment) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(attachment);
    } catch (err) {
      next(err);
    }
  },
};
