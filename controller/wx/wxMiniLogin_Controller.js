const request = require("request"); //http请求模块
const appid = "wxe6d74c44b857ba7b";
const secret = "00c2105ad289a858de30209a10b73295";
const AdminModel = require("../../models/admin/admin");
const wapLogin = require("../admin/login");
const getIdmethod = require("../../prototype/ids");
const dtime = require("time-formater");
const logger = require("../../logs/logs").logger;
const secretKey = require('../../js/jwt');
const jwt = require("jsonwebtoken");

const wxlogin = async (req, res, next) => {
  let urlstr = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code`;
  if (req.query.i == 2) {
    // 是wap端登录 去下一个中间件
    console.log(req.query, "是wap端登录传的query,去下一个中间件");
    logger.info("wxlogin---------是wap端登录传的query", req.query);
    next()
  } else if (req.query.min == "wx") {
    urlstr += `&js_code=${req.query.code}`;
    // 先通过小程序会员查AdminModel 是否有小程序 openids
    // if (req.query.uid || req.body.uid) {
    //   console.log('已经有登录过的uid', req.query.uid, req.body.uid)
    // }
    let json = await postMethods(urlstr, req, res);
    if (json.status == false) {
      res.send({
        msg: "请登录",
        data: {},
        result: 0,
      });
    } else {
      req.session.user = {
        userName: json.userList.user_name,
        password: json.userList.password,
        uid: json.userList.id,
      };
      const tokenStr = jwt.sign({ username: json.userList.user_name, id: json.userList.id }, secretKey, { expiresIn: '8h' })
      // token 到时候小程序调用index路由的接口用到的校验
      res.send({
        msg: "登录成功",
        data: json.userList,
        sessionID: req.sessionID,
        result: 1,
        tokenStr: tokenStr
      });
    }
  }
};
const postMethods = function (urlstr, req, res) {
  return new Promise((resolve, reject) => {
    let fields = {};
    request(urlstr, async (error, response, body) => {
      if (error) {
        logger.error('postMethods',error)
        reject;
      }
      let bodyData = JSON.parse(body);
      let userList;
      if (bodyData.openid) {
        let checkOpenid = await AdminModel.findOne({ openid: bodyData.openid });
        // 如果用户表里面有openid 就返回已注册的用户信息给前端
        if (checkOpenid) {
          userList = checkOpenid;
          resolve({
            status: true,
            userList,
          });
          logger.info(
            "已经存在该会员的信息---------静默登录",
            process.cwd(),
            checkOpenid
          );
        } else {
          if (!req.query.info) {
            //有openid而且没有用户信息就返回result :0,或者msg请登录 ，让用户跳转取授权登录页面
            resolve({
              status: false,
            });
          }
          if (req.query.info) {
            fields = JSON.parse(req.query.info);
          }
          const admin_id = await getIdmethod.getId("admin_id");
          // 有openid且有用户信息就在用户表新建一个并且返回给前端
          const newAdmin = {
            user_name: fields.nickName ? fields.nickName : "小程序用户", //小程序默认名称
            password: fields.password ? fields.password : "123456", //默认密码
            id: admin_id,
            create_time: dtime().format("YYYY-MM-DD HH:mm:ss"),
            admin: "2",
            status: 3,
            avatar: fields.image ? fields.image : "",
          };
          newAdmin.session_key = bodyData.session_key;
          newAdmin.openid = bodyData.openid;
          userList = await AdminModel.create(newAdmin);
          logger.info(
            "有openid且有用户信息就在用户表新建一个并且返回给前端",
            process.cwd()
          );

          resolve({
            status: true,
            userList,
          });
        }
      } else {
        resolve({
          status: false,
        });
      }
    });
  });
};
module.exports = wxlogin;
