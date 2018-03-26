const Joi = require('joi');

const userSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
});

const requiredUserSchema = userSchema.requiredKeys(
  'firstName',
  'lastName',
  'email'
);

module.exports = {
  userSchema,
  requiredUserSchema,
};
