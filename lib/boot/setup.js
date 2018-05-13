const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('chronicler:setup');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

const config = require('../config');
const swaggerDoc = require('../../api-docs/swagger.json');

/**
 * Expose setup helper.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function setup(app) {
  if (config('env') === 'development') {
    debug('development settings');
  }

  if (config('env') === 'testing') {
    debug('testing settings');
  }

  if (config('env') === 'production') {
    debug('production settings');
  }

  // Save config in app
  app.set('config', config);

  // Set app port
  app.set('port', app.get('config').port || 3000);

  // Configure native `Express` body parser - application/json
  app.use(bodyParser.json());

  // Secure app by setting various HTTP headers
  app.use(helmet());

  // CORS-enabled for all origins
  app.use(cors());

  // Use `Passport` setup & helpers middleware
  app.use(passport.initialize());

  // Use `Swagger` as live documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Set logger
  app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode < 400,
      stream: process.stderr,
    })
  );

  app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.stdout,
    })
  );
};
