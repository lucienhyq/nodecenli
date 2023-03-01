const courseModel = require('../../models/course/course');
const orderModel = require('../../models/order/order');
const logger = require('../../logs/logs').logger;
const getIdmethod = require('../../prototype/ids');
const dtime = require('time-formater');
const coursePay = async (req, res, next) => {
  try {
    let curseId = req.query.id;
    let orderList;
    let uid = req.session.user.uid ? req.session.user.uid : 0;
    let list = await courseModel.find({ id: curseId });
    // 时间戳生成得订单流水号
    let randomSn = createordernum();
    if (list.length <= 0 && list[0].id != curseId) {
      throw new Error('购买失败，请检查商品是否存在')
    }
    let checkSn = await orderModel.find({ orderSn: randomSn });
    if (checkSn.length > 0) {
      throw new Error('购买失败，请重新下单')
    }
    let json = {
      orderId: await getIdmethod.getId('order_id'),
      goodsId: list[0].id,
      create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
      course_price: list[0].course_price,
      orderSn: randomSn,
      numberId: uid
    }
    orderList = await orderModel.create(json);
    res.send({
      result: 1,
      msg: '',
      data: orderList
    })
  } catch (error) {
    formatErrorMessage(res, String(error));
    logger.error(error);
  }
}

function setTimeDateFmt(s) {  // 个位数补齐十位数
  return s < 10 ? '0' + s : s;
}

function createordernum() {
  const now = new Date()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  month = setTimeDateFmt(month)
  day = setTimeDateFmt(day)
  hour = setTimeDateFmt(hour)
  minutes = setTimeDateFmt(minutes)
  seconds = setTimeDateFmt(seconds)
  let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
  return orderCode;
  //基于年月日时分秒+随机数生成订单编号
}

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}
module.exports = coursePay;