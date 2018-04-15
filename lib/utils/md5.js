const crypto = require('crypto');

/**
 * MD5 hash generator.
 *
 * @param {String} string String to encrypt.
 * @return {String} MD5 encrypted string.
 * @api public
 */
module.exports = function md5(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
};
