const { NOT_FOUND, OK } = require('http-status-codes');

const Attendee = require('../models/attendee');
const config = require('../config');
const { findDocuments, getDocument, insertDocument } = require('../utils');

module.exports = {
  find: (req, res, next) => {
    try {
      findDocuments(req, res, Attendee, config);
    } catch (err) {
      next(err);
    }
  },

  get: (req, res, next) => {
    try {
      getDocument(req, res, Attendee);
    } catch (err) {
      next(err);
    }
  },

  insert: async (req, res, next) => {
    try {
      insertDocument(req, res, Attendee);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { attendeeId } = req.value.params;
      const attendee = await Attendee.findByIdAndUpdate(
        attendeeId,
        req.value.body,
        {
          new: true,
        }
      );

      res.status(OK).json(attendee);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { attendeeId } = req.value.params;
      const attendee = await Attendee.findByIdAndRemove(attendeeId);

      if (!attendee) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(attendee);
    } catch (err) {
      next(err);
    }
  },
};
