const logger = require('../../logs/logs').logger;
const AdminModel = require('../../models/admin/admin');

var wx_GetUser = async (req, res, next) => {
  try {
    console.log(req.session.user, req.query)
    let adminUser = await AdminModel.findOne({ user_name: 'swag12' });
    res.send({
      result:1,
      msg:'测试',
      data:adminUser
    })
    // let json = {};
    // json = req.query;
    // AdminModel.findOneAndUpdate({ id: req.session.user.uid }, json, (err, result) => {
    //   console.log(err, result)
    //   if (err) {
    //     res.send({
    //       status: 0,
    //       success: '没有该用户',
    //       result: 0
    //     })
    //     return
    //   }
    //   res.send({
    //     status: 1,
    //     success: '修改成功',
    //     result: 1
    //   })
    // });

  } catch (error) {
    logger.info('error' + error)
    next()
  }
}
module.exports = wx_GetUser