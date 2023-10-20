const logger = require('../logs/logs').logger;
const path = require('path');
const wxCheckLogin = async (req, res, next) => {
  const sessionId = req.query.sessionId;
  const sessionData = req.sessionStore.sessions[sessionId];
  if (!sessionData || !sessionId) {
    res.send({
      msg: "请登录",
      data: {},
      result: 0,
    });
  } else {
    const userInfo = JSON.parse(sessionData)?.user;
    const currentDirectory = path.relative(process.cwd(), __dirname);
    logger.info(`${currentDirectory}检查微信小程序登录session状态`, userInfo)
    req.userInfo = userInfo;
    next();
  }
}
module.exports = wxCheckLogin