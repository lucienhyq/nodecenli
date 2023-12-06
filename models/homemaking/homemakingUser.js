
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
  hmuid: {
    type: Number,
    unique: true,
  },
  // 家政下属的会员，可以用来到客户家里扫码到达状态
  bindUid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id"
  },
  // 创建时间
  create_time: String,
  avatar: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ''
  },
  workTime: {
    type: Object,
    default: {}
  },
  // 平台是否显示
  clientShow: {
    type: Boolean,
    default: true
  },
  creatUid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id"
  },
})

homeMakingUser.index({ id: 1 });

const User = db.model('homeMaking', homeMakingUser);


module.exports = User