const AdminModel = require('../../models/admin/admin');
const formidable = require('formidable');
const logger = require('../../logs/logs').logger;
var login = async (req, res, next) => {
  logger.info(req.body, req.url, req.method, req.route)
  try {
    let fields = req.body;
    var user = await AdminModel.findOne({ user_name: fields.user_name })
    if (!user || !fields) {
      res.send({
        result: 0,
        msg: '没有此用户',
      })
      return
    } else {
      if ((fields.password == user.password) && (fields.user_name == user.user_name)) {
        // 密码一样，添加session
        req.session.user = {
          userName: user.user_name,
          password: user.password,
          uid: user.id,
        };
        res.send({
          result: 1,
          msg: '登录成功',
          data: { id: user.id },
          session: req.session
        })
        return
      } else {
        res.send({
          result: 0,
          msg: '账号密码错误',
        })
      }
    }
  } catch (error) {
    logger.info('error' + error)
    next()
  }
}



module.exports = login;