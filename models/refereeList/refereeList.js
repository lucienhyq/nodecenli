
// import mongoose from 'mongoose'
var mongoose = require('mongoose');
const db = require('../../db')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  // 裁判称呼
  referee_name:String,
  // 裁判价格
  referee_Price:Number,
  // 裁判ids
  referee_ids:{
    type:Number,
    unique:true,
  },
  // 创建时间
  create_time:String,
  create:String,
  // 头像
  avatar: { type: String, default: 'default.jpg' },
  // 所在城市
  city: String,
  // 联系电话
  mobile:String,
  createID:{
    type:Number,
    default:0
  }
})

adminSchema.index({ id: 1 });

const Admin = db.model('referee', adminSchema);


module.exports = Admin