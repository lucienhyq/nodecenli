const logger = require('../logs/logs').logger;
const outLogin = async (req, res, next) => {
  // 退出登录，服务端清空session，前端清空head的token
  // console.log(req.session)
  req.session.destroy(function (err) {
    console.log(err);
  })
  res.send({
    result: 1,
    data: '',
    msg: '退出登录',
  })
}
module.exports = outLogin;