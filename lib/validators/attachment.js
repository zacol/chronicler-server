const Joi = require('joi');

const attachmentSchema = Joi.object().keys({
  meetup: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const requiredAttachmentSchema = attachmentSchema.requiredKeys('meetup');

module.exports = {
  attachmentSchema,
  requiredAttachmentSchema,
};
