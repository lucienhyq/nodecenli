const refereeListModel = require('../../models/refereeList/refereeList');
const logger = require('../../logs/logs').logger;
/**
 * 
 * @param {referee_name,referee_Price,referee_ids,avatar,city,mobile} req 
 * 裁判称呼 裁判价格 裁判ids 头像 所在城市 联系电话
 * @param {*} res 
 * @param {*} next 
 */
const updateReferee = async (req, res, next) => {
  try {
    if(!req.body.id){
      formatErrorMessage(res,'请选择编辑的裁判')
      return
    }
    // updateOne 更新一个，updateMany 更新多个
    let json = {};
    if (req.body.referee_name) {
      json.referee_name = req.body.referee_name;
    }
    if (req.body.referee_Price) {
      json.referee_Price = req.body.referee_Price;
    }
    if (req.body.avatar) {
      json.avatar = req.body.avatar;
    }
    if (req.body.city) {
      json.city = req.body.city;
    }
    if (req.body.mobile) {
      json.mobile = req.body.mobile;
    }
    const findInfo = await refereeListModel.findOne({ referee_ids: Number(req.body.id) });
    if (!findInfo) {
      logger.info('没有这个裁判,uid:' + req.session.user.uid)
      next("没有这个裁判")
      return
    }
    if (Object.keys(json).length == 0) {
      logger.info('没有更改内容,uid:' + req.session.user.uid)
      next("没有更改内容")
      return
    }
    const updateinfo = await refereeListModel.updateOne({ 'referee_ids': Number(req.body.id) }, json);
    if (!updateinfo) {
      logger.info('编辑失败,uid:' + req.session.user.uid)
      next("编辑失败")
      return
    }
    res.send({
      result: 1,
      data: [],
      msg: '编辑成功',
    })
  } catch (error) {
    formatErrorMessage(res,error)
    logger.info('error' + error)
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
module.exports = updateReferee;