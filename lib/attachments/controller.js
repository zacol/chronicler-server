const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Attachment = require('../models/attachment');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { offset, limit, sort } = req.query;

      const attachments = await Attachment.paginate(
        {},
        {
          offset: +offset || config.pagination.offset,
          limit: +limit || config.pagination.limit,
          sort,
        }
      );

      res.status(OK).json(attachments);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { attachmentId } = req.value.params;
      const attachment = await Attachment.findById(attachmentId);

      if (!attachment) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(attachment);
    } catch (err) {
      next(err);
    }
  },

  upload: async (req, res, next) => {
    try {
      const { files, body } = req;
      const newFiles = files.map(
        file =>
          new Attachment({
            ...file,
            ...body,
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
