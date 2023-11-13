var mongoose = require('mongoose');
const db = require('../../db')
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  // 订单id
  orderId: {
    type: String,
    unique: true
  },
  // 订单商品id
  goodsId: {
    type: Number,
  },
  // 订单创建时间
  create_time: String,
  // 订单价格
  course_price: Number,
  // 订单流水号
  orderSn: String,
  // 订单状态
  status: {
    type: Number,
    default: 0
  },
  // 购买人id
  numberId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    field: "_id"
  },
  goodStatus: {
    type: String,
    default: 1
  },
  orderType: {
    type: String,
    default: ''
  }
})
orderSchema.index({ orderId: 1 });

const order = db.model('order', orderSchema);


module.exports = order