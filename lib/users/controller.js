const { NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const { findAll, findOneById } = require('../utils');
const User = require('../models/user');

module.exports = {
  /**
   * Creating new user is handled by auth registration
   */

  findAll: (req, res, next) => {
    try {
      findAll(req, res, User, config);
    } catch (err) {
      next(err);
    }
  },

  findOne: (req, res, next) => {
    try {
      findOneById(req, res, User);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findByIdAndUpdate(userId, req.value.body, {
        new: true,
      });

      res.status(OK).json(user);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findByIdAndRemove(userId);

      if (!user) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(user);
    } catch (err) {
      next(err);
    }
  },
};
