const jwt = require('jsonwebtoken');

const config = require('../config');

const signToken = user =>
  jwt.sign(
    {
      iss: 'Chronicler',
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    config.auth.JWTSecret
  );

module.exports = {
  googlePlusJwt: async (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
