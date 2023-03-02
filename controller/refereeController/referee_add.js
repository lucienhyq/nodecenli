const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const refereeListModel = require('../../models/refereeList/refereeList');
const logger = require('../../logs/logs').logger;

var addReferee = async (req, res, next) => {
  logger.info(req.body,req.route)
  try {
    const restaurant_id = await getIdmethod.getId('restaurant_id');
    let cBody = req.body;
    let uid = req.session.user.uid ? req.session.user.uid : 0;
    let newAdmin = {
      referee_name: cBody.referee_name,
      referee_Price: cBody.referee_Price,
      referee_ids: restaurant_id,
      create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
      create: Date.parse(new Date()),
      city: cBody.city,
      avatar: cBody.avatar ? cBody.avatar : "photo-mr.jpg",
      mobile: cBody.mobile,
      createID: uid,
      level: cBody.level
    }
    let userList = await refereeListModel.create(newAdmin);
    res.send({
      result: 1,
      data: userList,
      msg: '裁判信息添加成功',
    })
  } catch (error) {
    formatErrorMessage(error);
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
module.exports = addReferee;