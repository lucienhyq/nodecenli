const AdminModel = require('../../models/admin/admin');
const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const formidable = require('formidable');
const logger = require('../../logs/logs').logger
var register = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    if (req.session.user) {
      res.send({
        status: 1,
        success: '已经登录',
        session: req.session
      })
      return
    }
    form.parse(req, async (err, fields, files) => {
      // logger.info('formidable', fields)
      var user = await AdminModel.findOne({ user_name: fields.user_name })
      if (user) {
        req.session.user = {
          userName: fields.user_name,
          password: fields.password
        };
        res.send({
          status: 0,
          success: '此用户已经存在无法注册',
          data: user,
          session: req.session
        })
      } else {
        // 可以注册后增加id总数
        const admin_id = await getIdmethod.getId('admin_id');
        const newAdmin = {
          user_name: fields.user_name,
          password: fields.password,
          id: admin_id,
          create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
          admin: fields.admin,
          status: fields.status,
        }
        let userList = await AdminModel.create(newAdmin)
        req.session.user = {
          userName: fields.user_name,
          password: fields.password
        };
        res.send({
          status: 1,
          success: '注册管理员成功',
          data: userList,
          session: req.session
        })
      }
    })
  } catch (error) {
    logger.info('error' + error)
    next()
  }
}

module.exports = register