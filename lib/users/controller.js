const { NO_CONTENT, NOT_FOUND, OK } = require('http-status-codes');

const User = require('../models/user');

module.exports = {
  /**
   * Creating new user is handled by auth registration
   */

  findAll: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(OK).json(users);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(user);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndRemove(userId);

      if (!user) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(NO_CONTENT);
    } catch (err) {
      next(err);
    }
  },
};
