const AdminModel = require('../../models/admin/admin');
const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const logger = require('../../logs/logs').logger
var login = async (req, res, next) => {
  try {
    logger.info('debugdebugdebug已经注册'+JSON.stringify(req.query))
    var user = await AdminModel.findOne({ user_name: req.query.user_name })
    if (user) {
      res.send({
        status: 0,
        success: '已经注册',
        data: user
      })
    } else {
      // 可以注册后增加id总数
      const admin_id = await getIdmethod.getId('admin_id');
      const newAdmin = {
        user_name: req.query.user_name,
        password: req.query.password,
        id: admin_id,
        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
        admin: req.query.admin,
        status: req.query.status,
      }
      let userList = await AdminModel.create(newAdmin)
      res.send({
        status: 1,
        success: '注册管理员成功',
        data: userList
      })
    }
  } catch (error) {
    logger.info('error'+error)
    next()
  }
}

module.exports = login