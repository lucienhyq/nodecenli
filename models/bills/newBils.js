
// import mongoose from 'mongoose'
var mongoose = require('mongoose');
const db = require('../../db')

const Schema = mongoose.Schema;

const bilsSchema = new Schema({
  creatUid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id"
  },
  id: {
    type: String,
    unique: true,
  },
  type_us: {
    type: String,
    // income 收入 expense 支出
    enum: ['income', 'expense'],
  },
  // 金额
  amount: {
    type: Number,
  },
  // 时间
  time: {
    type: Date,
  },
  /*备注类型 
    交通 1
    餐饮 2
    生活用品 3
    医疗 4
    话费 5
    美容 6
    娱乐 7
    烟酒 8
    旅游 9
    学习 10
    运动 11
    住房 12
    幼儿 13
    其他 0
  */
  noteType: {
    type: Number,
    default: 0
  },
  // 备注
  note: {
    type: String,
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

bilsSchema.index({ id: 1 });

const Bills = db.model('bils', bilsSchema);


module.exports = Bills