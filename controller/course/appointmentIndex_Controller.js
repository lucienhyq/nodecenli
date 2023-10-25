const dtime = require('time-formater');
const appointmentModel = require('../../models/course/appointment');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const qrCode_Controller = require("../qrCode");
// appointment  中间件middleware


const appointment = async (req, res, next) => {
  try {
    let list;
    let good = await courseModel.find({ id: req.body.courseId });
    if (good.length <= 0) throw new Error('预约商品不存在');
    if (good[0].goodStatus != 2) throw new Error('不是预约商品');
    let len = await appointmentModel.find({}).sort({ id: -1 });
    let json = {
      id: len.length == 0 ? 1 : Number(len[0].id) + 1,
      appointmentTime: Date.now(),
      appointmentDay: dtime().format('YYYY-MM-DD'),
      userName: req.body.userName,
      mobile: req.body.mobile,
      courseId: req.body.courseId,
      memberId: req.session.user ? req.session.user.uid : req.body.memberId
    }
    // 验证当前是否签到
    list = await appointmentModel.create(json);
    res.send({
      result: 1,
      data: list,
      msg: '签到成功',
    })
  } catch (error) {
    formatErrorMessage(res, error);
    logger.error('error' + error);
  }
}
// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": String(message),
  });
}

function isToday(str) {
  if (new Date(str).toDateString() === new Date().toDateString()) {
    //今天
    return true
  } else if (new Date(str) < new Date()) {
    //之前
    return false
  }
}

module.exports = appointment;