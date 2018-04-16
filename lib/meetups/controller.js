const { NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Meetup = require('../models/meetup');
const { findDocuments, getDocument, insertDocument } = require('../utils');

module.exports = {
  find: (req, res, next) => {
    try {
      findDocuments(req, res, Meetup, config);
    } catch (err) {
      next(err);
    }
  },

  get: (req, res, next) => {
    try {
      getDocument(req, res, Meetup);
    } catch (err) {
      next(err);
    }
  },

  insert: async (req, res, next) => {
    try {
      insertDocument(req, res, Meetup);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { meetupId } = req.value.params;
      const meetup = await Meetup.findByIdAndUpdate(meetupId, req.value.body, {
        new: true,
      });

      res.status(OK).json(meetup);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { meetupId } = req.value.params;
      const meetup = await Meetup.findByIdAndRemove(meetupId);

      if (!meetup) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(meetup);
    } catch (err) {
      next(err);
    }
  },
};
