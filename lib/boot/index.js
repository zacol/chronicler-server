const express = require('express');

// Create application
const app = express();

// Config application
require('./setup')(app);

// Link models with `mongoDB` database
require('../models')(app);

// Load auth routes and login strategies with passport
require('../auth')(app);

// Handle errors
require('../error-handler')(app);

module.exports = app;
