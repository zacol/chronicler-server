const md5 = require('./md5');
const findDocuments = require('./find-documents');
const getDocument = require('./get-document');
const insertDocument = require('./insert-document');

module.exports = {
  findDocuments,
  getDocument,
  insertDocument,
  md5,
};
