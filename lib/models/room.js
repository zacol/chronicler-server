const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const { Schema } = mongoose;

// Define `Room` Schema
const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define Schema Indexes for `MongoDB`
RoomSchema.index({ name: 1, capacity: 1 });

// Define Schema toObject options
RoomSchema.set('toObject', { getters: true });
RoomSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

RoomSchema.plugin(mongoosePaginate);
RoomSchema.plugin(deepPopulate);

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Room', RoomSchema);
