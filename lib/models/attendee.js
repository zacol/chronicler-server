const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

// Define `Attendee` Schema
const AttendeeSchema = new Schema(
  {
    meetup: {
      type: Schema.Types.ObjectId,
      ref: 'Meetup',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
      enum: ['accepted', 'declined', 'needsAction', 'tentative'],
      default: 'needsAction',
    },
  },
  {
    timestamps: true,
  }
);

// Define Schema Indexes for `MongoDB`
AttendeeSchema.index({ name: 1 });

// Define Schema toObject options
AttendeeSchema.set('toObject', { getters: true });
AttendeeSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

AttendeeSchema.plugin(mongoosePaginate);

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Attendee', AttendeeSchema);
