const logger = require("../logs/logs").logger;
const path = require("path");

const LOGIN_MSG = "请登录";
const WX_CHECK_LOGIN_LOG = "wxCheckLogin";
const SESSION_ID_KEY = "sessionId";
const USER_INFO_KEY = "user";

const wxCheckLogin = async (req, res, next) => {
  // min:pc是不用进行小程序验证
  const minPresent = req.body.min || req.query.min;
  logger.info(
    ":::::::::::::::min:pc是不用进行小程序验证",
    minPresent,
    req.user
  );
  if (minPresent) {
    next();
    return;
  }
  if (req.session.user) {
    logger.info("直接带session.user进来的", req.session.user, req.user._id);
    req.user = {
      userName: req.session.user.username,
      uid: req.session.user.id,
      _id: req.user._id,
    };
    next();
    return;
  }
  // logger.info(WX_CHECK_LOGIN_LOG, req.body.min, req.query.min, req.session.user);
  // logger.info(`${SESSION_ID_KEY} || ${SESSION_ID_KEY}`, req.query[SESSION_ID_KEY], req.body[SESSION_ID_KEY]);

  const sessionId = req.query[SESSION_ID_KEY] || req.body[SESSION_ID_KEY];
  if (!sessionId) {
    res.send({
      msg: LOGIN_MSG,
      data: {},
      result: 0,
    });
    return;
  }

  try {
    const sessionData = req.sessionStore.sessions[sessionId];
    if (!sessionData) {
      res.send({
        msg: LOGIN_MSG,
        data: {},
        result: 0,
      });
      return;
    }

    const userInfo = JSON.parse(sessionData)[USER_INFO_KEY];
    if (!userInfo) {
      res.send({
        msg: LOGIN_MSG,
        data: {},
        result: 0,
      });
      return;
    }

    const currentDirectory = path.relative(process.cwd(), __dirname);
    req.session.user = {
      userName: userInfo.userName,
      id: userInfo.uid,
    };
    logger.info(
      `${currentDirectory}检查微信小程序登录session状态`,
      userInfo,
      req.session
    );

    req.userInfo = userInfo;
    req.user = userInfo;
    next();
  } catch (error) {
    logger.error("处理sessionId和sessionData时发生错误", error);
    res.send({
      msg: "系统错误",
      data: {},
      result: 0,
    });
  }
};

module.exports = wxCheckLogin;
