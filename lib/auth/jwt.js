const jwt = require('jsonwebtoken');

const config = require('../config');

const signToken = user =>
  jwt.sign(
    {
      iss: 'Chronicler',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    config.auth.JWTSecret
  );

module.exports = {
  googlePlusJwt: async (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
