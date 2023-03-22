const logger = require('../logs/logs').logger;
module.exports = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(200).send({
      msg: "请登录",
      data: {},
      result: 0,
    });
  }

}