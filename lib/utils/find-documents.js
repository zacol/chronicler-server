const aqp = require('api-query-params');
const { OK } = require('http-status-codes');

/**
 * Find documents that fulfil constraints and process them before send back.
 *
 * @param {Object} req Request object with information about the HTTP request.
 * @param {Object} res Response object to build your response.
 * @param {Object} Model Constructor compiled from Schema definitions.
 * @param {Object} config Config object with information about current setup.
 * @api public
 */
module.exports = async function findDocuments(req, res, Model, config) {
  const { filter, limit, projection, skip, sort } = aqp(req.query, config.aqp);

  const { populate } = req.query;

  const pagination = await Model.paginate(filter, {
    sort,
    limit: limit || config.pagination.limit,
    offset: skip || config.pagination.offset,
    select: projection,
  });

  const deepPopulated = [];

  if (populate) {
    pagination.docs.forEach(doc => {
      deepPopulated.push(doc.deepPopulate(populate));
    });
  }

  if (deepPopulated.length) {
    Promise.all(deepPopulated).then(() => {
      res.status(OK).json(pagination);
    });
  } else {
    res.status(OK).json(pagination);
  }
};
