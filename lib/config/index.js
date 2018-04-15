const { resolve } = require('path');

const debug = require('debug')('chronicler:config');
const merge = require('merge-util');

const envConf = require('./env');
const { md5 } = require('../utils');

const environment = process.env.NODE_ENV || 'development';

const filepath = resolve(__dirname, `${environment}.json`);

let localConf = {};

try {
  debug('Load local configuration from %s', filepath);

  localConf = require(filepath); // eslint-disable-line global-require, import/no-dynamic-require
} catch (err) {
  debug('Found error: %s', err.message);
}

debug('Merge environment set configuration variables');
const conf = merge(localConf, envConf);
conf.env = environment;

debug(
  'Loaded config object for env %s with sha %j',
  environment,
  md5(JSON.stringify(conf))
);

function config(key) {
  if (Object.prototype.hasOwnProperty.call(conf, key)) {
    return conf[key];
  }

  debug('Invalid config key "%s"', key);
  throw new Error(`Invalid config key ${key}`);
}

Object.entries(conf).forEach(([key, value]) => {
  config[key] = value;
});

module.exports = config;
