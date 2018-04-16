const { NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const { findDocuments, getDocument, insertDocument } = require('../utils');
const Room = require('../models/room');

module.exports = {
  find: (req, res, next) => {
    try {
      findDocuments(req, res, Room, config);
    } catch (err) {
      next(err);
    }
  },

  get: (req, res, next) => {
    try {
      getDocument(req, res, Room);
    } catch (err) {
      next(err);
    }
  },

  insert: async (req, res, next) => {
    try {
      insertDocument(req, res, Room);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { roomId } = req.value.params;
      const meetup = await Room.findByIdAndUpdate(roomId, req.value.body, {
        new: true,
      });

      res.status(OK).json(meetup);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { roomId } = req.value.params;
      const room = await Room.findByIdAndRemove(roomId);

      if (!room) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(room);
    } catch (err) {
      next(err);
    }
  },
};
