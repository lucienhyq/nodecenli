const logger = require("../logs/logs").logger;
const path = require("path");
const wxCheckLogin = async (req, res, next) => {
  if (req.body.min || req.query.min) {
    logger.info('wxCheckLogin', req.body.min, req.query.min, req.session.user)
    logger.info("req.query.sessionId || req.body.sessionId", req.query.sessionId , req.body.sessionId)
    if (req.session.user) {
      logger.info("直接带session.user进来的", req.session.user);
      req.user = {
        userName: req.session.user.userName,
        uid: req.session.user.uid
      }
      next();
    } else if (req.query.sessionId || req.body.sessionId) {
      // 有sessionId是微信小程序的
      const sessionId = req.query.sessionId || req.body.sessionId;
      const sessionData = req.sessionStore.sessions[sessionId];
      if (!sessionData || !sessionId) {
        res.send({
          msg: "请登录",
          data: {},
          result: 0,
        });
      } else {
        const userInfo = JSON.parse(sessionData).user;
        const currentDirectory = path.relative(process.cwd(), __dirname);
        req.session.user = {
          userName: userInfo.userName,
          id: userInfo.uid
        };
        logger.info(`${currentDirectory}检查微信小程序登录session状态`, userInfo, req.session);
        req.userInfo = userInfo;
        req.user = userInfo;
        next();
      }
    } else {
      res.send({
        msg: "请登录",
        data: {},
        result: 0,
      });
    }
  } else {
    next()
  }

};
module.exports = wxCheckLogin;
