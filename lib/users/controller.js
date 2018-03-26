const { NOT_FOUND, OK } = require('http-status-codes');

const User = require('../models/user');
const config = require('../config');

module.exports = {
  /**
   * Creating new user is handled by auth registration
   */

  findAll: async (req, res, next) => {
    try {
      const { offset, limit, sort } = req.query;

      const users = await User.paginate(
        {},
        {
          offset: +offset || config.pagination.offset,
          limit: +limit || config.pagination.limit,
          sort,
        }
      );

      res.status(OK).json(users);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(user);
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

      res.status(200).json(user);
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
