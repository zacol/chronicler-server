const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define `User` Schema
const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, lowercase: true, trim: true },
  profiles: {
    'google-plus': { type: Object },
  },
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meetup',
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Define Schema Indexes for `MongoDB`
UserSchema.index({ firstName: 1, lastName: 1 });

// Define Schema toObject options
UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

// Nothing here yet

/**
 * -- Model's API Extension
 */

/**
 * Get `fullName` from `firstName` and `lastName`
 *
 * @return {String} fullName
 * @api public
 */
UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Set `fullName` from `String` param splitting
 * and calling firstName as first value and lastName
 * as the concatenation of the rest values
 *
 * @param {String} name
 * @return {User}
 * @api public
 */
UserSchema.virtual('fullName').set(function setFullName(name) {
  const split = name.split(' ');

  if (split.length) {
    this.firstName = split.shift();
    this.lastName = split.join(' ');
  }

  return this;
});

/**
 * Find `User` by its email
 *
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api public
 */
UserSchema.statics.findByEmail = function findByEmail(email) {
  return this.findOne({ email });
};

/**
 * Find `User` by social provider id
 *
 * @param {Object} profile
 * @return {Error} err
 * @return {User} user
 * @api public
 */
UserSchema.statics.findByProvider = function findByProvider(profile) {
  const path = `profiles.${profile.provider}.id`;
  const query = {};

  query[path] = profile.id;

  return this.findOne(query);
};

module.exports = mongoose.model('User', UserSchema);
