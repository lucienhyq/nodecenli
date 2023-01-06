
// import mongoose from 'mongoose'
var mongoose = require('mongoose');
const db = require('../../db')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  user_name: String,
  password: String,
  id: {
    type:Number,
    unique:true,
  },
  create_time: String,
  admin: { type: String, default: '管理员' },
  status: Number,  //1:普通管理、 2:超级管理员
  avatar: { type: String, default: 'default.jpg' },
  city: String,
},{
  timestamps:true
})

adminSchema.index({ id: 1 });

const Admin = db.model('Admin', adminSchema);


module.exports = Admin