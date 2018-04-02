const debug = require('debug')('chronicler:fixtures');
const fixtures = require('pow-mongodb-fixtures');

const config = require('../config');
const meetups = require('./meetups');
const rooms = require('./rooms');

const db = fixtures.connect(config.mongoUrl, {
  safe: true,
});

db.clearAllAndLoad(
  {
    meetups,
    rooms,
  },
  err => {
    if (err) {
      debug('Error: %s', err.message);
      process.exit(1);
    } else {
      debug('Fixtures loaded');
      process.exit(0);
    }
  }
);
