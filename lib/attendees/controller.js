const { NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Attendee = require('../models/attendee');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { offset, limit, sort } = req.query;

      const attendees = await Attendee.paginate(
        {},
        {
          offset: +offset || config.pagination.offset,
          limit: +limit || config.pagination.limit,
          sort,
        }
      );

      res.status(OK).json(attendees);
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

      res.status(201).json(newAttendee);
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

      res.status(200).json(attendee);
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
