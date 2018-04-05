const { createObjectId } = require('pow-mongodb-fixtures');

module.exports = [
  {
    _id: createObjectId('5ac66b5c0872bd573b6da0fe'),
    profiles: {},
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'joe.doe@gmail.com',
  },
  {
    _id: createObjectId('5ac66b5c0872bd573b6da100'),
    profiles: {},
    firstName: 'Sean',
    lastName: 'Parkes',
    email: 'sean.parkes@gmail.com',
  },
];
