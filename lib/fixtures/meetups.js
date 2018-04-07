const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId('5ac6643b113a2854ec65ae52'),
    attendees: [
      createObjectId('5ac66b5b0872bd573b6da0fd'),
      createObjectId('5ac66b5c0872bd573b6da0ff'),
    ],
    description: 'How to connect your Angular components with Redux.',
    endDate: new Date('2018-04-02T16:00:00.000Z'),
    expenses: 30,
    room: createObjectId('5ac25d0431f6ce0216778888'),
    speakers: [],
    startDate: new Date('2018-04-02T14:00:00.000Z'),
    status: 'confirmed',
    title: 'Angular in love with Redux',
  },
  {
    _id: createObjectId('5ac6643b113a2854ec65ae53'),
    attendees: [],
    description: 'Elegant mongodb object modeling for node.js',
    endDate: new Date('2018-04-16T10:00:00.000Z'),
    expenses: 120,
    room: createObjectId('507f1f77bcf86cd799439011'),
    speakers: [],
    startDate: new Date('2018-04-16T11:00:00.000Z'),
    status: 'cancelled',
    title: 'Introduction to Mongoose',
  },
];
