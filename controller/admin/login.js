const AdminModel = require('../../models/admin/admin');
const formidable = require('formidable');
const secretKey = require('../../js/jwt');
const jwt = require("jsonwebtoken");
var login = async (req, res, next) => {
  let fields = req.body;
  // console.log('ddddddddf',fields)
  try {
    var user = await AdminModel.findOne({ user_name: fields.user_name })
    if (!user || !fields) {
      res.send({
        result: 0,
        msg: '没有此用户',
      })
      return
    } else {
      const tokenStr = jwt.sign({ username: fields.user_name,id:user.id }, secretKey, { expiresIn: '8h' })
      // console.log(tokenStr,'sdasdas')
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
          data: { token:tokenStr,id: user.id },
          session: req.session.user
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