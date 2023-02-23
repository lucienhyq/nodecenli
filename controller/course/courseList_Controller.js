const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const courseList = async (req, res, next) => {
  try {
    let list = await courseModel.find({});
    res.send({
      result: 1,
      msg: '已经登录',
      data: {
        data: list,
        total: await courseModel.find({}).count(),
      }
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
    "msg": message || '',
  });
}
module.exports = courseList;