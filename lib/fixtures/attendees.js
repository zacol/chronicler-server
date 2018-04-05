const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId('5ac66b5b0872bd573b6da0fd'),
    meetup: createObjectId('5ac6643b113a2854ec65ae52'),
    user: createObjectId('5ac66b5c0872bd573b6da0fe'),
    status: 'accepted',
  },
  {
    _id: createObjectId('5ac66b5c0872bd573b6da0ff'),
    meetup: createObjectId('5ac6643b113a2854ec65ae53'),
    user: createObjectId('5ac66b5c0872bd573b6da100'),
    status: 'needsAction',
  },
];
