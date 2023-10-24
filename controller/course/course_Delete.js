const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const course_Delete = async (req, res, next) => {
  try {
    let good_id = req.query.goods_id;
    logger.info(good_id, 'good_id')
    courseModel.deleteOne({ id: good_id }).then((result) => {
      logger.info(result, '删除成功')
      res.send({
        result: 1,
        msg: '删除成功'
      })
    }).catch((error) => {
      logger.info(error, '删除失败')
      res.send({
        result: 0,
        msg: '删除失败'
      })
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
module.exports = course_Delete;