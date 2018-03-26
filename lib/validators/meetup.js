const Joi = require('joi');

const meetupSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  hosts: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .min(1)
    .unique(),
});

const requiredMeetupSchema = meetupSchema.requiredKeys(
  'title',
  'description',
  'hosts'
);

module.exports = {
  meetupSchema,
  requiredMeetupSchema,
};
