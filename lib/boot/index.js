const express = require('express');

// Create application
const app = express();

// Config application
require('./setup')(app);

// Link models with `mongoDB` database
require('../models')(app);

// Load auth routes and login strategies with passport
require('../auth')(app);

app.get('*', (req, res) => {
  // TODO: Hook API handler
  res.end();
});

module.exports = app;
