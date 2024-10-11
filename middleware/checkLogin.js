const jwt = require("jsonwebtoken");
const secretKey = require("../js/jwt");
const logger = require("../logs/logs").logger;
// const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller");
// const wxCheckLogin = require("../middleware/wxCheckLogin");
const AdminModel = require("../models/admin/admin");
class Login {
  static async verToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) return reject(error);
        resolve(decoded);
      });
    });
  }
  constructor() {
    this.formatErrorMessage = this.formatErrorMessage.bind(this);
  }

  async checkLogin(req, res, next) {
    let token = req.headers["authorization"];
    if (!token) {
      logger.info(req.route.path, "token=undefined:",req.session);
      if(req.session.user){ 
        req.user = {
          userName: req.session.user.userName,
          uid: req.session.user.uid
        };
        return next()
      };
      if (req.query.min === "wx" || req.body.min === "wx") {
        return next();
      }
      if (req.path !== "/checkLoginUser") {
        return res.send({
          result: 0,
          data: null,
          msg: "请登录",
        });
      }
      return next();
    }
    if (token.indexOf("Bearer") > -1) {
      token = token.replace("Bearer ", "");
    }

    try {
      let decoded = await Login.verToken(token);
      logger.info(":::::::::::::::登录token解析信息", decoded, decoded.id);
      req.session.user = decoded;
      const data_info = await AdminModel.findOne({ id: decoded.id });
      if (!data_info) {
        res.send({
          result: 0,
          data: null,
          msg: "请登录,没找到该用户",
        });
        return;
      }
      req.user = {
        userName: data_info.user_name,
        uid: data_info.id,
        _id: data_info._id,
      };
      logger.info("qqqqqqq:::::::")
      return next();
    } catch (error) {
      logger.error(req.query, req.route.path, req.method, error);
      if (error.name === "TokenExpiredError") {
        return res.status(200).send({
          result: 0,
          msg: "请登录",
          data: "token已过期请重新登录",
        });
      }
      return next(error);
    }
  }

  async checkLoginUser(req, res, next) {
    try {
      if (!req.session.user) {
        return res.send({
          result: 0,
          data: null,
          msg: "请登录",
        });
      }
      const userInfo = await AdminModel.findOne({
        id: req.session.user.uid || req.session.user.id,
      });
      if (userInfo) {
        return res.send({
          result: 1,
          msg: "已登录",
          data: {
            user_name: userInfo.user_name,
            id: userInfo.id,
            avatar: userInfo.avatar,
          },
        });
      }
      return res.send({
        result: 0,
        data: null,
        msg: "请登录",
      });
    } catch (error) {
      this.formatErrorMessage(res, error);
      logger.error("appointmentSingIn——error", error);
    }
  }

  formatErrorMessage(res, message) {
    res.status(500).send({
      data: "error",
      result: 0,
      msg: String(message),
    });
  }
}

module.exports = new Login();
