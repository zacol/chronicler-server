const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const Attendee = require('../models/attendee');
const config = require('../config');
const paginateModel = require('../utils/paginate-model');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      paginateModel(req, res, Attendee, config);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { attendeeId } = req.value.params;
      const attendee = await Attendee.findById(attendeeId);

      if (!attendee) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(attendee);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newAttendee = new Attendee(req.value.body);

      await newAttendee.save();

      res.status(CREATED).json(newAttendee);
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
