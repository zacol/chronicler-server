const aqp = require('api-query-params');
const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Attendee = require('../models/attendee');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { filter, limit, projection, skip, sort } = aqp(
        req.query,
        config.aqp
      );

      const attendees = await Attendee.paginate(filter || {}, {
        sort,
        limit: limit || config.pagination.limit,
        offset: skip || config.pagination.offset,
        select: projection,
      });

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
