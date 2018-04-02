const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

// Define `Meetup` Schema
const MeetupSchema = new Schema(
  {
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    description: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    speakers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['confirmed', 'tentative', 'cancelled'],
      default: 'confirmed',
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define Schema Indexes for `MongoDB`
MeetupSchema.index({ title: 1 });

// Define Schema toObject options
MeetupSchema.set('toObject', { getters: true });
MeetupSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

MeetupSchema.plugin(mongoosePaginate);

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Meetup', MeetupSchema);
