const Joi = require('joi');

const attendeeSchema = Joi.object().keys({
  user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  meetup: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  status: Joi.string().valid(
    'accepted',
    'declined',
    'needsAction',
    'tentative'
  ),
});

const requiredAttendeeSchema = attendeeSchema.requiredKeys(
  'user',
  'meetup',
  'status'
);

module.exports = {
  attendeeSchema,
  requiredAttendeeSchema,
};
