const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

// Define `Attachment` Schema
const AttachmentSchema = new Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    meetup: {
      type: Schema.Types.ObjectId,
      ref: 'Meetup',
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define Schema Indexes for `MongoDB`
AttachmentSchema.index({ filename: 1, size: 1 });

// Define Schema toObject options
AttachmentSchema.set('toObject', { getters: true });
AttachmentSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

AttachmentSchema.plugin(mongoosePaginate);

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Attachment', AttachmentSchema);
