
var mongoose = require('mongoose');
const db = require('../../db')

const Schema = mongoose.Schema;

const homeMakingUser = new Schema({
  // 家政人员名称
  realname: {
    type: String,
    default: ''
  },
  // 家政人员id
  uid: {
    type: Number,
    unique: true,
  },
  creatUid: {
    type: Number,
    ref: "Admin",
    field: "id"
  },
  // 创建时间
  create_time: String,
  avatar: {
    type: String,
    default: "photo-mr.jpg"
  },
  mobile: {
    type: String,
    default: ''
  },
  workTime: {
    type: Object,
    default: {}
  },
  clientShow: {
    type: Boolean,
    default: false
  }
})

homeMakingUser.index({ id: 1 });

const User = db.model('homeMaking', homeMakingUser);


module.exports = User