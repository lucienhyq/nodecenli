const logger = require('../../logs/logs').logger;
const AdminModel = require('../../models/admin/admin');

var wx_GetUser = async (req, res, next) => {
  try {
    console.log(req.userInfo)
    res.send({
      result: 1,
      msg: '测试',
      data: ""
    })
    let json = {};
    // json = req.query;
    AdminModel.findOneAndUpdate({ id: req.userInfo.uid }, json, (err, result) => {
      console.log(err, result)
      if (err) {
        res.send({
          status: 0,
          success: '没有该用户',
          result: 0
        })
        return
      }
      res.send({
        success: '成功',
        result: 1
      })
    });

  } catch (error) {
    logger.info('error' + error)
    next()
  }
}
module.exports = wx_GetUser