const Joi = require('joi');

const meetupSchema = Joi.object().keys({
  attendees: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .unique(),
  description: Joi.string(),
  endDate: Joi.date()
    .iso()
    .min(Joi.ref('startDate')),
  room: Joi.string(),
  speakers: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .unique(),
  startDate: Joi.date()
    .iso()
    .max(Joi.ref('endDate')),
  status: Joi.string().valid('confirmed', 'tentative', 'cancelled'),
  title: Joi.string(),
});

const requiredMeetupSchema = meetupSchema.requiredKeys(
  'description',
  'endDate',
  'room',
  'speakers',
  'startDate',
  'status',
  'title'
);

module.exports = {
  meetupSchema,
  requiredMeetupSchema,
};
