const logger = require('../logs/logs').logger;
module.exports = function (req, res, next) {
  logger.info(req.query, req.route.path, req.method)
  let jsonArr = {
    data: [],
    result: 0,
    msg: "请登录",
    login: false
  };
  if (!req.session.user && req.body.is != 1) {
    res.send(jsonArr);
  } else {
    next();
  }
};
