const UserAccessModel = require('../../models/admin/UserAccess');
const adminModel = require('../../models/admin/admin')
const dtime = require('time-formater');

const logger = require('../../logs/logs').logger;
/**
 *userId：用户ID，引用了另一个名为User的集合中的文档。

  ipAddress：用户访问时的IP地址。 req.ip或request-ip第三方中间件

  userAgent：用户访问时的User-Agent字符串。 req.headers['user-agent'];

  timestamp：用户访问的时间戳。
  
 * @param {userId} req 
 * @param {*} res 
 * @param {*} next 
 */
const UserAccess = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  try {
    let findUser = await adminModel.find({ id: Number(req.query.userId) });
    let list;
    if (findUser) {
      let json = {
        userId: 23,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      }
      let findInd = await UserAccessModel.find({ userId: req.query.userId });
      console.log(findInd.length)
      // if (findInd) {
      //   json.total = Number(findInd);
      // }
      list = await UserAccessModel.create(json)
    }
    res.send({
      result: 1,
      msg: '已经登录',
      data: list
    })
  } catch (error) {
    formatErrorMessage(res, error);
    logger.error('error' + error);
  }
}

// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}
module.exports = UserAccess;