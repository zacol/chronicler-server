const express = require('express');
const passport = require('passport');

const BudgetController = require('./controller');
const { validateParam, validateBody, schemas } = require('../validators');

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), BudgetController.find)
  .post(
    passport.authenticate('jwt', { session: false }),
    validateBody(schemas.requiredBudgetSchema),
    BudgetController.insert
  );

router
  .route('/:budgetId')
  .get(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'budgetId'),
    BudgetController.get
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'budgetId'),
    validateBody(schemas.requiredBudgetSchema),
    BudgetController.update
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'budgetId'),
    validateBody(schemas.budgetSchema),
    BudgetController.update
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateParam(schemas.idSchema, 'budgetId'),
    BudgetController.delete
  );

module.exports = router;
