const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const { Schema } = mongoose;

// Define `Budget` Schema
const BudgetSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    from: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Define Schema Indexes for `MongoDB`
BudgetSchema.index({ from: 1 });

// Define Schema toObject options
BudgetSchema.set('toObject', { getters: true });
BudgetSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

BudgetSchema.plugin(mongoosePaginate);
BudgetSchema.plugin(deepPopulate);

/**
 * -- Model's API Extension
 */

// Nothing here yet

module.exports = mongoose.model('Budget', BudgetSchema);
