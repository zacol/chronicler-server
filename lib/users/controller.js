const User = require('../models/user');

module.exports = {
  getIndex: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  postIndex: (req, res) => {
    res.status(201).json({
      action: 'Create new user',
    });
  },
};
