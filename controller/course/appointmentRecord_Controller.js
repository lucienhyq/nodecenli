const dtime = require('time-formater');
const appointmentModel = require('../../models/course/appointment');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;

const appointmentRecord = async (req, res, next) => {
  console.log(req.params, req.body, req.query, 'params')
  try {
    let list;
    // 每页显示15条数据
    let pageSize = 15;
    let page = req.body.page;
    let nowPageNum = ((page - 1) * pageSize);
    let total = 0;
    let currentData;
    let json = { id: { $exists: true } }
    if (req.body.memberId) {
      json.memberId = req.body.memberId;
    }
    if (req.body.currentData) {
      currentData = dtime(Number(req.body.currentData)).format('YYYY-MM-DD');
      json.appointmentDay = currentData;
    }
    await appointmentModel.find(json).skip(nowPageNum).limit(pageSize).sort({ id: -1 }).then((data) => {
      list = data;
      total = data.length;
    });
    if (list.length <= 0) {
      res.send({
        result: 0,
        msg: 'null',
      })
    } else {
      res.send({
        result: 1,
        msg: '成功',
        list: {
          data: list,
          total,
          current_page: page
        }
      })
    }

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

module.exports = appointmentRecord;