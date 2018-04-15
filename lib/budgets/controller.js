const { CREATED, NOT_FOUND, OK } = require('http-status-codes');

const Budget = require('../models/budget');
const config = require('../config');
const paginateModel = require('../utils/paginate-model');

module.exports = {
  findAll: async (req, res, next) => {
    try {
      paginateModel(req, res, Budget, config);
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
