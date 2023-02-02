const logger = require('../logs/logs').logger;
const outLogin = async (req, res, next) => {
  // 推出登录
  console.log(req.session)
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