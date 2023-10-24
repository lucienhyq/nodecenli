const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;



const addCourse = async (req, res, next) => {
  try {
    let gid = await getIdmethod.getId('goods_id');
    let info = req.body.form;
    logger.info(req.body, 'addCourse')
    let json = {
      id: gid,
      title: info.title,
      course_price: Number(info.course_price),
      create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
      conten: info.conten,
      shelfStatus: info.shelfStatus == 'true' || info.shelfStatus ? true : false,
      goodimg: info.goodimg,
      inventory: Number(info.inventory),
      goodStatus: info.goodStatus
    }
    await courseModel.create(json)
    let list = await courseModel.find({}).sort({ goods_id: -1 });
    res.send({
      result: 1,
      data: list,
      msg: '发布成功',
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