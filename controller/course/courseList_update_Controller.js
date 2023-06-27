const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const courseLisUpdate = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  try {
    let list;
    if (req.body.id) {
      list = await courseModel.find({ id: req.query.id });
    } else {
      formatErrorMessage(res, '没有该商品')
      return
    }
    let json = {};
    if (req.body.shelfStatus == '1') {
      json.shelfStatus = true;
    } else if (req.body.shelfStatus == '2') {
      json.shelfStatus = false;
    }
    let updateinfo = await courseModel.updateOne({ 'id': req.body.id }, json);
    if (!updateinfo) {
      logger.info('编辑失败,uid:' + req.session.user.uid)
      next("编辑失败")
      return
    }
    res.send({
      result: 1,
      msg: '已经登录',
      data: {
        list,
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
module.exports = courseLisUpdate;