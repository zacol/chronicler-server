const Joi = require('joi');

const meetupSchema = Joi.object().keys({
  attendees: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .unique(),
  description: Joi.string(),
  endDate: Joi.date()
    .iso()
    .min(Joi.ref('startDate')),
  expenses: Joi.number().min(0),
  room: Joi.string(),
  speakers: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .unique(),
  startDate: Joi.date()
    .iso()
    .max(Joi.ref('endDate')),
  status: Joi.string().valid('cancelled', 'confirmed', 'tentative'),
  title: Joi.string(),
});

const requiredMeetupSchema = meetupSchema.requiredKeys(
  'description',
  'endDate',
  'expenses',
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
