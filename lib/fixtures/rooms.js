const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId('5ac25d0431f6ce0216778888'),
    name: 'Castle',
    capacity: 20,
  },
  {
    _id: createObjectId('507f1f77bcf86cd799439011'),
    name: 'Stadium',
    capacity: 40,
  },
];
