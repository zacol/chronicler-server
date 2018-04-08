const aqp = require('api-query-params');
const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const config = require('../config');
const Budget = require('../models/budget');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { filter, limit, projection, skip, sort } = aqp(
        req.query,
        config.aqp
      );

      const budgets = await Budget.paginate(filter || {}, {
        sort,
        limit: limit || config.pagination.limit,
        offset: skip || config.pagination.offset,
        select: projection,
      });

      res.status(OK).json(budgets);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { budgetId } = req.value.params;
      const budget = await Budget.findById(budgetId);

      if (!budget) {
        return res.sendStatus(NOT_FOUND);
      }

      res.status(OK).json(budget);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newBudget = new Budget(req.value.body);

      await newBudget.save();

      res.status(CREATED).json(newBudget);
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
