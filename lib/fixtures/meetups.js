const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId(),
    attendees: [],
    description: 'How to connect your Angular components with Redux.',
    endDate: '2018-04-02T16:00:00.000Z',
    expenses: 30,
    room: '5ac25d0431f6ce0216778888',
    speakers: [],
    startDate: '2018-04-02T14:00:00.000Z',
    status: 'confirmed',
    title: 'Angular in love with Redux',
  },
  {
    _id: createObjectId(),
    attendees: [],
    description: 'Elegant mongodb object modeling for node.js',
    endDate: '2018-04-16T10:00:00.000Z',
    expenses: 120,
    room: '507f1f77bcf86cd799439011',
    speakers: [],
    startDate: '2018-04-16T11:00:00.000Z',
    status: 'cancelled',
    title: 'Introduction to Mongoose',
  },
];
