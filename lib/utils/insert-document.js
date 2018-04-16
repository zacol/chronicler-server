const { CREATED } = require('http-status-codes');

/**
 * Insert new document and send it back.
 *
 * @param {Object} req Request object with information about the HTTP request.
 * @param {Object} res Response object to build your response.
 * @param {Object} Model Constructor compiled from Schema definitions.
 * @api public
 */
module.exports = async function insertDocument(req, res, Model) {
  const newDocument = new Model(req.value.body);

  await newDocument.save();

  res.status(CREATED).json(newDocument);
};
