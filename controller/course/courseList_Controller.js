const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const courseList = async (req, res, next) => {
  try {
    let list;
    if (req.query.min == 'pc' || req.query.min == 'wx') {
      if (req.body.id) {
        list = await courseModel.findOne({ id: req.body.id });
        res.send({
          result: 1,
          msg: '成功',
          data: {
            list,
          }
        })
      } else {
        list = await courseModel.find({});
        res.send({
          result: 1,
          msg: '已经登录',
          data: {
            list,
            total: await courseModel.find({}).count(),
          }
        })
      }
      return
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
    "msg": message || '',
  });
}
module.exports = courseList;