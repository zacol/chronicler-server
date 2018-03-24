const { NO_CONTENT, NOT_FOUND, OK } = require('http-status-codes');

const Meetup = require('../models/meetup');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const meetups = await Meetup.find({});

      res.status(OK).json(meetups);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { meetupId } = req.params;
      const meetup = await Meetup.findById(meetupId);

      if (!meetup) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(meetup);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newMeetup = new Meetup(req.body);

      await newMeetup.save();

      res.status(201).json(newMeetup);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { meetupId } = req.params;
      const meetup = await Meetup.findByIdAndUpdate(meetupId, req.body, {
        new: true,
      });

      res.status(200).json(meetup);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { meetupId } = req.params;
      const meetup = await Meetup.findByIdAndRemove(meetupId);

      if (!meetup) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(NO_CONTENT);
    } catch (err) {
      next(err);
    }
  },
};
