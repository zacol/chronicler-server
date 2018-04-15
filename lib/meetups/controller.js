const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Meetup = require('../models/meetup');
const { findAll, findOneById } = require('../utils');

module.exports = {
  findAll: (req, res, next) => {
    try {
      findAll(req, res, Meetup, config);
    } catch (err) {
      next(err);
    }
  },

  findOne: (req, res, next) => {
    try {
      findOneById(req, res, Meetup);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newMeetup = new Meetup(req.value.body);

      await newMeetup.save();

      res.status(CREATED).json(newMeetup);
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
