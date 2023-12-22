var mongoose = require('mongoose');
const db = require('../../db')

const Schema = mongoose.Schema;

const bilsAccount = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id"
  },
  // 记账金额 可以为负数
  totalMoney: {
    type: Number,
    default: 0
  },
  // 支出金额
  expensePrice: {
    type: Number,
    default: 0
  },
  // 收入金额
  incomePrice: {
    type: Number,
    default: 0
  },
  created: {
    type: Number
  },
  updated: {
    type: Number
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
bilsAccount.index({ id: 1 });

const bildsAccountSchema = db.model('bilsAccount', bilsAccount);


module.exports = bildsAccountSchema;