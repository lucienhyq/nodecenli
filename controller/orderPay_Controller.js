const orderModel = require('../models/order/order');
const logger = require('../logs/logs').logger;

const orderPay = async (req, res, next) => {
  logger.info(req.body,req.route);
  try {
    // orderModel
    let order_id = req.query.orderId;
    let orderList = await orderModel.find({ orderId: order_id });
    orderList = orderList[0];
    // 待支付状态
    if (orderList.status == 0) {
      // status:1 已支付
      orderList.status = 1;
      await orderModel.updateOne({ 'orderId': order_id }, orderList);
      // 课程商品订单支付成功后 可以进行签到
    }
    res.send({
      result: 1,
      msg: '支付成功',
      data: {}
    })
  } catch (error) {
    formatErrorMessage(res, '支付失败');
    logger.error(error);
  }
}

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}
module.exports = orderPay;