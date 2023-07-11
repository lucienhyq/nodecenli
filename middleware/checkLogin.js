const jwt = require("jsonwebtoken");
const secretKey = require('../js/jwt');
const logger = require('../logs/logs').logger;
const wxMiniLogin_Controller = require('../controller/wx/wxMiniLogin_Controller')
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
    logger.info(req.query, req.route.path, req.method, 'token=undefined:',token)
    // 没有token还要判断一下是否是小程序那边
    if(req.query.min == 'wx' || req.body.min == 'wx'){
      // 如果是小程序就走 wxMiniLogin_Controller
      // wxMiniLogin_Controller(req,res,next)
      next();
    }else{
      console.log(req.path)
      console.log(req.body,'2222222222')
      if(req.path == '/checkLoginUser'){
        next()
      }else{
        res.status(200).json(jsonArr);
      }
    }
  } else {
    if (token.indexOf('Bearer' > 0)) {
      token = token.replace('Bearer ', '')
    }
    await verToken(token).then((data) => {
      req.session.user = data;
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
