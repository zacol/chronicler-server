const { NOT_FOUND, OK } = require('http-status-codes');

/**
 * Get one document by id and process it before send back.
 *
 * @param {Object} req Request object with information about the HTTP request.
 * @param {Object} res Response object to build your response.
 * @param {Object} Model Constructor compiled from Schema definitions.
 * @api public
 */
module.exports = async function findOneById(req, res, Model) {
  const id = Object.values(req.value.params)[0];
  const { populate, projection } = req.query;

  const doc = await Model.findOne(id)
    .select(projection)
    .deepPopulate(populate);

  if (!doc) {
    return res.sendStatus(NOT_FOUND);
  }

  res.status(OK).json(doc);
};
