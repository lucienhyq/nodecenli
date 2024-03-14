var mongoose = require("mongoose");
const db = require("../../db");

const Schema = mongoose.Schema;

const homeMakingUser = new Schema({
  // 家政人员名称
  realname: {
    type: String,
    default: "",
  },
  // 家政人员id
  hmuid: {
    type: Number,
    unique: true,
  },
  // 创建人员的会员id，可以是后台管理员创建，可以是用户创建（用户创建需要申请权限后面再做）
  creatUid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id",
  },
  // 创建时间
  create_time: String,
  avatar: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  workTime: {
    type: Object,
    default: {},
  },
  // 平台是否显示
  clientShow: {
    type: Boolean,
    default: true,
  },
  // 兼职还是全职
  takeOrder: {
    type: Boolean,
    default: true,
  },
  // 工时价钱 每小时价格
  price: {
    type: String,
    default: "0",
  },
  // 员工等级 0最低，每完成100单提升一级
  level: {
    type: String,
    default: "0",
  },
  // 完成订单数量
  orderEndNumber: {
    type: String,
    default: "0",
  },
  // 审核状态 0审核中
  status: {
    type: Number,
    default: 0,
  },
});

homeMakingUser.index({ id: 1 });

const User = db.model("homeMaking", homeMakingUser);

module.exports = User;
