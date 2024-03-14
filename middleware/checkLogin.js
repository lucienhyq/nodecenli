const jwt = require("jsonwebtoken");
const secretKey = require("../js/jwt");
const logger = require("../logs/logs").logger;
const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller");
const wxCheckLogin = require("../middleware/wxCheckLogin");
const AdminModel = require("../models/admin/admin");
class Login {
  async checkLogin(req, res, next) {
    logger.info(req.query, req.route.path, req.method);
    var token = req.headers["authorization"];
    if (token == undefined) {
      logger.info(
        req.query,
        req.route.path,
        req.method,
        "token=undefined:",
        token,
        req.query.min,
        req.body.min
      );
      // 没有token还要判断一下是否是小程序那边
      if (req.query.min == "wx" || req.body.min == "wx") {
        next();
      } else {
        console.log("222222222222", req.session);
        if (req.path == "/checkLoginUser") {
          next();
        } else {
          res.send({
            result: 0,
            data: null,
            msg: "请登录",
          });
        }
      }
    } else {
      if (token.indexOf("Bearer" > 0)) {
        token = token.replace("Bearer ", "");
      }
      await verToken(token)
        .then((data) => {
          logger.info(":::::::::::::::登录token解析信息", data, data.id);
          req.session.user = data;
          AdminModel.findOne({ id: data.id }).then((data_info) => {
            if (!data_info) {
              res.send({
                result: 0,
                data: null,
                msg: "请登录",
              });
              logger.info(data_info, "22221");
              return;
            }
            req.user = {
              userName: data_info.user_name,
              uid: data_info.id,
              _id: data_info._id,
            };
            next();
          });
        })
        .catch((error) => {
          logger.error(req.query, req.route.path, req.method, error);
          if (error.name == "TokenExpiredError") {
            res.status(200).send({
              result: 0,
              msg: "请登录",
              data: "token已过期请重新登录",
            });
          } else {
            // res.status(200).json(jsonArr);
            next();
          }
        });
    }
  }
  async checkLoginUser(req, res, next) {
    try {
      if (!req.session.user) {
        res.send({
          result: 0,
          data: null,
          msg: "请登录",
        });
        return;
      }
      let userInfo = await AdminModel.findOne({
        id: req.session.user.uid || req.session.user.id,
      });
      let { user_name, id, avatar } = userInfo;
      if (userInfo) {
        res.send({
          result: 1,
          msg: "已登录",
          data: {
            user_name,
            id,
            avatar,
          },
        });
      } else {
        res.send({
          result: 0,
          data: null,
          msg: "请登录",
        });
      }
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error("appointmentSingIn——error" + error);
    }
  }
}
module.exports = new Login();

const verToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(decoded);
    });
  });
};

const formatErrorMessage = function (res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: String(message),
  });
};
