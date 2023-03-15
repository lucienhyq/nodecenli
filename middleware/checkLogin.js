const jwt = require("jsonwebtoken");
const secretKey = require('../js/jwt');
const logger = require('../logs/logs').logger;
const jsonArr = {
  data: [],
  result: 0,
  msg: "未登录",
  login: false
};
module.exports = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  var token = req.headers['authorization'];
  if (token == undefined) {
    logger.info(req.query, req.route.path, req.method, 'token=undefined')
    res.status(200).json(jsonArr);
    return next();
  } else {
    if (token.indexOf('Bearer' > 0)) {
      token = token.replace('Bearer ', '')
    }
    await verToken(token).then((data) => {
      req.user = data;
      next()
    }).catch((error) => {
      logger.info(req.query, req.route.path, req.method, error)
      if (error.name == 'TokenExpiredError') {
        res.status(200).send({
          result: 0,
          msg: "请登录",
          data: "token已过期请重新登录"
        });
      } else {
        res.status(200).json(jsonArr);
      }

    })
  }

};


const verToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        reject(error)
        return
      }
      resolve(decoded);
    });
  })
}
