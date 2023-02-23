const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;



const addCourse = async (req, res, next) => {
  try {
    let gid = await getIdmethod.getId('goods_id')
    let json = {
      id: gid,
      title: req.body.title,
      course_price: Number(req.body.course_price),
      create_time:dtime().format('YYYY-MM-DD HH:mm:ss'),
      conten: req.body.conten,
      shelfStatus: req.body.shelfStatus == 'true' ? true : false,
      goodimg: req.body.goodimg,
      inventory: Number(req.body.inventory),
    }
    await courseModel.create(json)
    let list = await courseModel.find({}).sort({ goods_id: -1 });
    res.send({
      result: 1,
      data: list,
      msg: '',
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
module.exports = addCourse;