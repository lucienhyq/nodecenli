var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  // 订单id
  orderId: {
    type: String,
    unique: true,
  },

  // 订单创建时间
  create_time: String,
  // 订单价格
  price: Number,
  // 订单流水号
  orderSn: String,
  // 订单状态
  status: {
    type: Number,
    default: 0,
  },
  // 购买人id
  numberId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id",
  },
  // 如果是course类型就传课程商品id关联查询
  crouse_id: {
    type: Schema.Types.ObjectId,
    ref: "course",
    field: "_id",
  },
  // 订单状态 0未结算
  goodStatus: {
    type: String,
    default: 0,
  },
  // 订单对应的商品类型
  orderType: {
    type: String,
    default: "",
  },
});
orderSchema.index({ orderId: 1 });
orderSchema.add({
  Hmid: {
    type: Schema.Types.ObjectId,
    ref: "homeMaking",
    field: "_id",
  },
  startTime: {
    type: String,
    default: "",
  },
  endTime: {
    type: String,
    default: "",
  },
});
const order = db.model("order", orderSchema);

module.exports = order;
