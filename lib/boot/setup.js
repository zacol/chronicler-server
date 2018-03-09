const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require('debug')('chronicler:setup');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const config = require('../config');

/**
 * Expose configuration helper.
 *
 * @param {Express} app `Express` instance.
 * @api public
 */
module.exports = function configuration(app) {
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

  /**
   * Configure native `Express` body parser:
   * application/x-www-form-urlencoded
   * application/json
   * application/vnd.api+json as json
   */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // Configure native `Express` cookie parser
  app.use(cookieParser('chronicler'));

  // Configure native `Express` session middleware
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      secret: 'chronicler',
      store: new MongoStore({
        url: config('mongoUrl'),
      }),
    })
  );

  // Use `Passport` setup & helpers middleware
  app.use(passport.initialize());

  // Use `Passport` sessions middleware
  app.use(passport.session());

  // Set custom error handler
  app.use((err, req, res, next) => {
    debug('Some odd error: %j', err);
    next();
  });
};
