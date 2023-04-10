const UserAccessModel = require('../../models/admin/UserAccess');
const logger = require('../../logs/logs').logger;
const UserAccess = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  try {
    // UserAccessModel
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
module.exports = UserAccess;