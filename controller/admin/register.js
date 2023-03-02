const AdminModel = require('../../models/admin/admin');
const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const formidable = require('formidable');
const logger = require('../../logs/logs').logger
var register = async (req, res, next) => {
  logger.info(req.body,req.url,req.method,req.route)
  try {
    if (req.session.user) {
      res.send({
        result: 1,
        msg: '已经登录',
        session: req.session
      })
      return
    }
    console.log(req.body,'dddddddd')
    // form.parse(req, async (err, fields, files) => {
      let fields = req.body;
      var user = await AdminModel.findOne({ user_name: fields.user_name });
      if (user) {
        req.session.user = {
          userName: fields.user_name,
          password: fields.password
        };
        res.send({
          result: 0,
          msg: '此用户已经存在无法注册',
          data: user,
          session: req.session
        })
      } else {
        // 可以注册后增加id总数
        const admin_id = await getIdmethod.getId('admin_id');
        if (!fields.user_name || !fields.password) {
          res.send({
            result: 0,
            msg: '请输入正确的账号密码',
            data: [],
            session: req.session
          })
          return
        }
        if (fields.admin = '') {
          res.send({
            result: 0,
            msg: '请选择会员等级',
            data: [],
            session: req.session
          })
          return
        }
        // if(!fields.image){
        //   res.send({
        //     result: 0,
        //     msg: '请选择会员头像',
        //     data: [],
        //     session: req.session
        //   })
        //   return
        // }
        const newAdmin = {
          user_name: fields.user_name,
          password: fields.password,
          id: admin_id,
          create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
          admin: fields.status == 0 ? '管理员' : '超级管理员',
          // status: fields.status,
          avatar: fields.image?fields.image:''
        }
        let userList = await AdminModel.create(newAdmin)
        req.session.user = {
          userName: fields.user_name,
          password: fields.password,
          uid: admin_id,
        };
        res.send({
          result: 1,
          msg: '注册管理员成功',
          data: userList,
          session: req.session
        })
      }
    // })
  } catch (error) {
    logger.info('error' + error)
    next()
  }
}

module.exports = register