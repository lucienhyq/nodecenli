const logger = require('../../logs/logs').logger;
const AdminModel = require('../../models/admin/admin');

var usetEdit = async (req, res, next) => {
  logger.info(req.body,req.url,req.method,req.route)
  try {
    console.log(req.session.user, req.query)
    let json = {};
    json = req.query;
    AdminModel.findOneAndUpdate({ id: req.session.user.uid }, json, (err, result) => {
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
        status: 1,
        success: '修改成功',
        result: 1
      })
    });

  } catch (error) {
    logger.info('error' + error)
    next()
  }
}
module.exports = usetEdit