const User = require('../models/user');
const Meetup = require('../models/meetup');

function userNotFound() {
  const err = new Error('User not found');
  err.status = 404;
  return err;
}

module.exports = {
  /**
   * Creating new user is handled by auth registration
   */

  findAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  findOneUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return next(userNotFound());
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  findAllMeetups: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate('meetups');

      if (!user) {
        return next(userNotFound());
      }

      res.status(200).json(user.meetups);
    } catch (err) {
      next(err);
    }
  },

  createMeetup: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newMeetup = new Meetup(req.body);
      const user = await User.findById(userId);

      if (!user) {
        return next(userNotFound());
      }

      newMeetup.hosts.push(user);
      await newMeetup.save();

      user.meetups.push(newMeetup);
      await user.save();

      res.status(201).json(newMeetup);
    } catch (err) {
      next(err);
    }
  },
};
