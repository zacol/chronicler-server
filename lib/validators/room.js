const Joi = require('joi');

const roomSchema = Joi.object().keys({
  name: Joi.string(),
  capacity: Joi.number(),
});

const requiredRoomSchema = roomSchema.requiredKeys('name', 'capacity');

module.exports = {
  roomSchema,
  requiredRoomSchema,
};
