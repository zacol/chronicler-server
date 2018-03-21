const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define `Meetup` Schema
const MeetupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Define Schema Indexes for `MongoDB`
MeetupSchema.index({ title: 1 });

// Define Schema toObject options
MeetupSchema.set('toObject', { getters: true });
MeetupSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

// Nothing here yet

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Meetup', MeetupSchema);
