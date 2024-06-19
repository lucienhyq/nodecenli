// 导入mongoose库，用于定义和操作MongoDB中的数据模型
var mongoose = require("mongoose");

// 导入数据库连接模块
const db = require("../../db");

// 引入Schema对象，用于定义数据模型的结构
const Schema = mongoose.Schema;

/**
 * 定义家政服务人员的数据模型
 * @property {String} makingName - 服务人员的名称，默认为空字符串
 * @property {Number} hmuid - 服务人员的唯一标识ID
 * @property {ObjectId} creatUid - 创建该服务人员的管理员ID，引用自Admin模型
 * @property {String} img - 服务人员的图片地址，默认为空字符串
 * @property {String} mobile - 使用创建服务人员的管理员电话号，默认为空字符串
 * @property {Object} work - 服务人员的工作信息，默认为空对象
 * @property {Boolean} clientShow - 是否在客户端显示该服务人员，默认为true
 * @property {Boolean} takeOrder - 服务人员是否接单，默认为true
 * @property {Number} status - 服务人员的审核状态，默认为0（审核中）
 */
const homeMakingUser = new Schema(
  {
    makingName: {
      type: String,
      default: "",
    },
    hmuid: {
      type: Number,
      unique: true,
    },
    creatUid: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    img: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    work: {
      type: Object,
      default: {},
    },
    clientShow: {
      type: Boolean,
      default: true,
    },
    takeOrder: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    // 新增字段：参与此服务的人员列表
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        field: "_id",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 为数据模型定义索引，此处索引了id字段
homeMakingUser.index({ hmuid: 1 });

// 根据定义的Schema创建一个名为homeMaking的模型
const User = db.model("homeMaking", homeMakingUser);

// 导出创建的模型
module.exports = User;
