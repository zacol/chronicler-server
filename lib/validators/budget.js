const Joi = require('joi');

const budgetSchema = Joi.object().keys({
  amount: Joi.number().min(0),
  from: Joi.date(),
});

const requiredBudgetSchema = budgetSchema.requiredKeys('amount', 'from');

module.exports = {
  budgetSchema,
  requiredBudgetSchema,
};
