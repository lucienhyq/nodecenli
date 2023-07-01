const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const courseLisUpdate = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  try {
    let list;
    if (req.body.id) {
      list = await courseModel.find({ id: req.body.id });
      console.log(list)
      if (list.length == 0) {
        formatErrorMessage(res, '没有该商品')
        return
      }
    } else {
      formatErrorMessage(res, '没有该商品')
      return
    }
    let json = {};
    // 修改上架状态
    if (req.body.shelfStatus == '1') {
      json.shelfStatus = true;
    } else if (req.body.shelfStatus == '2') {
      json.shelfStatus = false;
    }
    // 修改价格
    if (req.body.course_price) {
      json.course_price = Number(req.body.course_price);
    }
    // 修改详情
    if (req.body.conten) {
      json.conten = req.body.conten;
    }
    // 修改图片
    if (req.body.goodimg) {
      json.goodimg = req.body.goodimg;
    }
    // 修改库存
    if (req.body.inventory) {
      json.inventory = Number(req.body.inventory);
    }
    await courseModel.updateOne({ 'id': req.body.id }, json).then((data) => {
      res.send({
        result: 1,
        msg: '修改成功',
      })
    }).catch((err) => {
      res.send({ err: -1, msg: err._message, data: null })
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