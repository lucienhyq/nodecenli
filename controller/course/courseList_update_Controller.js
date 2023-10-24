const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;
const courseLisUpdate = async (req, res, next) => {
  // logger.info(req.query, req.route.path, req.method)
  try {
    let list;
    let good_id = req.body.id;
    let json = {};
    let form = req.body.form;
    if (good_id) {
      list = await courseModel.find({ id: good_id });
      if (list.length == 0) {
        formatErrorMessage(res, '没有该商品')
        return
      }
    } else {
      formatErrorMessage(res, '没有该商品')
      return
    }
    if (form) {
      // 修改上架状态
      if (form.shelfStatus == '1') {
        json.shelfStatus = true;
      } else if (form.shelfStatus == '2') {
        json.shelfStatus = false;
      }
      if(form.goodStatus){
        json.goodStatus = form.goodStatus
      }
      // 修改价格
      if (form.course_price) {
        json.course_price = Number(form.course_price);
      }
      // 修改详情
      if (form.conten) {
        json.conten = form.conten;
      }
      // 修改图片
      if (form.goodimg) {
        json.goodimg = form.goodimg;
      }
      // 修改库存
      if (form.inventory) {
        json.inventory = Number(form.inventory);
      }
      if (form.title) {
        json.title = String(form.title)
      }
    }
    logger.info(form, 'dwwwwwww',json)
    await courseModel.updateOne({ 'id': good_id }, json).then((data) => {
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