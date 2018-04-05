const Joi = require('joi');
const { BAD_REQUEST } = require('http-status-codes');

const { attendeeSchema, requiredAttendeeSchema } = require('./attendee');
const { meetupSchema, requiredMeetupSchema } = require('./meetup');
const { roomSchema, requiredRoomSchema } = require('./room');
const { userSchema, requiredUserSchema } = require('./user');

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

  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(BAD_REQUEST).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }

    if (!req.value.body) {
      req.value.body = {};
    }

    req.value.body = result.value;

    next();
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),

    attendeeSchema,
    requiredAttendeeSchema,

    meetupSchema,
    requiredMeetupSchema,

    roomSchema,
    requiredRoomSchema,

    userSchema,
    requiredUserSchema,
  },
};
