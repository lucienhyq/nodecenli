const AdminModel = require('../../models/admin/admin');
const formidable = require('formidable');
const logger = require('../../logs/logs').logger
var login = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(fields,'ddddddddddddddddd')
      var user = await AdminModel.findOne({ user_name: fields.user_name })
      if (!user || !fields) {
        res.send({
          status: 0,
          success: '没有此用户',
        })
        return
      } else {
        if ((fields.password == user.password) && (fields.user_name == user.user_name)) {
          // 密码一样，添加session
          req.session.user = {
            userName: user.user_name,
            password: user.password,
            uid:user.id,
          };
          res.send({
            status: 1,
            success: '登录成功',
            data: {id:user.id},
            // data:[],
            session: req.session
          })
          return
        } else {
          res.send({
            status: 0,
            success: '账号密码错误',
          })
        }
      }

    })
  } catch (error) {
    logger.info('error' + error)
    next()
  }
}



module.exports = login;