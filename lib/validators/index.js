const Joi = require('joi');
const { BAD_REQUEST } = require('http-status-codes');

module.exports = {
  validateParam: (schema, name) => (req, res, next) => {
    const result = Joi.validate({ param: req.params[name] }, schema);

    if (result.error) {
      return res.status(BAD_REQUEST).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }

    if (!req.value.params) {
      req.value.params = {};
    }

    req.value.params[name] = result.value.param;

    next();
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
