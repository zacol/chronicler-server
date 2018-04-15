const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const paginateModel = require('../utils/paginate-model');
const Room = require('../models/room');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      paginateModel(req, res, Room, config);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { roomId } = req.value.params;
      const room = await Room.findById(roomId);

      if (!room) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(room);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newRoom = new Room(req.value.body);

      await newRoom.save();

      res.status(CREATED).json(newRoom);
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
