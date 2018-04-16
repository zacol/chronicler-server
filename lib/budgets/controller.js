const { NOT_FOUND, OK } = require('http-status-codes');

const Budget = require('../models/budget');
const config = require('../config');
const { findDocuments, getDocument, insertDocument } = require('../utils');

module.exports = {
  find: (req, res, next) => {
    try {
      findDocuments(req, res, Budget, config);
    } catch (err) {
      next(err);
    }
  },

  get: (req, res, next) => {
    try {
      getDocument(req, res, Budget);
    } catch (err) {
      next(err);
    }
  },

  insert: async (req, res, next) => {
    try {
      insertDocument(req, res, Budget);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { budgetId } = req.value.params;
      const budget = await Budget.findByIdAndUpdate(budgetId, req.value.body, {
        new: true,
      });

      res.status(OK).json(budget);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { budgetId } = req.value.params;
      const budget = await Budget.findByIdAndRemove(budgetId);

      if (!budget) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(budget);
    } catch (err) {
      next(err);
    }
  },
};
