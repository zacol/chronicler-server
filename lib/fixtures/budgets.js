const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId(),
    amount: 100,
    from: new Date('1989-12-02T23:00:00.000Z'),
  },
  {
    _id: createObjectId(),
    name: 150,
    capacity: new Date('2017-12-31T23:00:00.000Z'),
  },
];
