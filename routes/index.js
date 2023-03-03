var express = require('express');
var router = express.Router();
// 会员信息model
const AdminModel = require('../models/admin/admin');
// 路由控制器 中间件
const register_Controller = require('../controller/admin/register');
const login_Controller = require('../controller/admin/login');
const usetEdit_Controller = require('../controller/admin/usetEdit_Controller')
const referee_all_Controller = require('../controller/refereeController/referee_all');
const referee_add_Controller = require('../controller/refereeController/referee_add');
const referee_update_Controller = require('../controller/refereeController/referee_update');
const referee_search_Controller = require('../controller/refereeController/referee_search');
const acquirePost_Controller = require('../controller/acquirePost');
const qrCode_Controller = require('../controller/qrCode');
const outLogin_Controller = require('../controller/outLogin');
const multipart = require('connect-multiparty');
const courseIndex_Controller = require("../controller/course/courseIndex_Controller");
const courseList_Controller = require("../controller/course/courseList_Controller");
const coursePay_Controller = require("../controller/course/coursePay_Controller");
const orderPay_Controller = require("../controller/orderPay_Controller")
const appointmentIndex_Controller = require("../controller/course/appointmentIndex_Controller")
// 中间件
const upload = require('../js/upload');
const logger = require('../logs/logs').logger;
const checkLogin = require('../middleware/checkLogin');
const multipartMiddleware = multipart();
const crypto = require('crypto');
const { request, ClientRequest } = require('http');
const { response } = require('express');

var parseString = require('xml2js').parseString;
var msg  = require('../js/ismsg');
var config = require("../js/isWcConfig");
var accessTokenJson = require("../js/wcAccess_token");
var util = require("util");
var menu = require("../js/menu");
const https = require('https')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect("index.html");
});
// 检查是否有登录
router.post('/checkLoginUser', async (req, res) => {
  if (!req.session.user) {
    res.redirect("login.html");
    res.send({ 'msg': '未登录', result: 0 });
  } else {
    try {
      let user = await AdminModel.findOne({ user_name: req.session.user.userName })
      res.send({
        result: 1,
        msg: '成功',
        data: user,
      })
    } catch (err) {
      formatErrorMessage(res, err.error)
    }
  }
})
router.get('/checkLoginUser', async (req, res) => {
  if (!req.session.user) {
    res.redirect("login.html");
    res.send({ 'msg': '未登录', result: 0 });
  } else {
    try {
      let user = await AdminModel.findOne({ user_name: req.session.user.userName })
      res.send({
        result: 1,
        msg: '成功',
        data: user,
      })
    } catch (err) {
      formatErrorMessage(res, err.error)
    }
  }
})
// 注册
router.post('/register', register_Controller);

// 登录
router.post('/login', login_Controller);

// 编辑会员信息
router.post('/usetEdit', checkLogin, usetEdit_Controller);

// 上传图片
router.post('/posts', (req, res) => {
  upload(req, res).then(imgsrc => {
    // 上传成功 存储文件路径 到数据库中
    res.send({ 'data': imgsrc, result: 1 });
  }).catch(err => {
    formatErrorMessage(res, err)
  })
});

// 获取会员信息
router.get('/getUserIndex', checkLogin, async (req, res) => {
  try {
    var user = await AdminModel.findOne({ user_name: req.session.user.userName })
    res.send({
      result: 1,
      msg: '成功',
      data: {
        member: user
      },
      session: req.session
    })
  } catch (err) {
    formatErrorMessage(res, err.error)
  }
})

router.post('/allReferee', checkLogin, referee_all_Controller);
router.post('/addReferee', checkLogin, referee_add_Controller);
router.post('/updateReferee', checkLogin, referee_update_Controller);
router.post('/searchReferee', checkLogin, referee_search_Controller);

router.post('/acquirePost', multipartMiddleware, acquirePost_Controller);
router.get('/acquirePost', multipartMiddleware, acquirePost_Controller);
router.get('/outLogin', outLogin_Controller);
router.post('/qrCode', checkLogin, qrCode_Controller);
// 添加课程文章
router.post('/courseIndex', multipartMiddleware, courseIndex_Controller);
// 获取课程文章列表
router.post('/courseList', multipartMiddleware, courseList_Controller);
// 课程文章创建订单
router.get('/courseCreate', multipartMiddleware, checkLogin, coursePay_Controller);
// 支付订单
router.post('/orderPay', multipartMiddleware, orderPay_Controller);
//签到
router.post('/appointmentIndex', multipartMiddleware, appointmentIndex_Controller);

const token = 'quan36091355';
// let secret = '71ef6ea6470f58dcd741c05f1493b11d';
// let appid = 'wxab206bb4cbe7857a';
// &appid=wxab206bb4cbe7857a&secret=71ef6ea6470f58dcd741c05f1493b11d
let access_token = '';
router.get('/getAccessToken',async (req,res,next)=>{
  await getAccessToken().then(function(response){
    console.log(response,'response => /getAccessToken')
    // var url = util.format(config.diyApi.createMenu, config.prefix, data);
        // requestPost(url,JSON.stringify(menu)).then(function(data){
        //     //将结果打印
        //     // console.log(data);
        // });
  })
  res.status(200).send({
    data:response
  })
})
// 微信
router.get('/wx', multipartMiddleware, async (req, res, next) => {
  let signature = req.query.signature;
  let timestamp = req.query.timestamp;
  let nonce = req.query.nonce;
  let echostr = req.query.echostr;
  console.log('ddddddddddddddddd')
  let array = new Array(token,timestamp,nonce);
  array.sort();
  let str = array.toString().replace(/,/g,"");
  //2. 将三个参数字符串拼接成一个字符串进行sha1加密
  var sha1Code = crypto.createHash("sha1");
  var code = sha1Code.update(str,'utf-8').digest("hex");

  //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if(code===signature){
      res.send(echostr)
  }else{
      res.send("error");
  }
});



/**
 * 封装请求get
 */
 let requestGet = function(url) {
  return new Promise (function(resolve, reject) {
      https.get(url, (error, response, body)=> {
          resolve(body);
      })
  })
};
// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}

//获取全局access_token
let getAccessToken = function(){
  let that = this;
  return new Promise(function(resolve,reject){
    var currentTime = new Date().getTime();
    //格式化请求地址，把刚才的%s按顺序替换
    var url = util.format(config.diyApi.getAccessToken, config.prefix, config.appID, config.appScrect);
    if(accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime){
        requestGet(url).then(function(data){
          console.log('dasdasdasd',url)
            // var result = JSON.parse(data); 
            resolve(data);
            return
            if(data.indexOf("errcode") < 0){
                accessTokenJson.access_token = result.access_token;
                accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                console.log('更新本地存储的' + result)
                //更新本地存储的
                fs.writeFile('../js/wcAccess_token.json',JSON.stringify(accessTokenJson),function(err){
                  if(err){
                    console.log(err)
                  }
                });
                resolve(accessTokenJson.access_token);
            }else{
              console.log('本地存储的')
                // resolve(result);
            } 
        });
    }else{
        //将本地存储的 access_token 返回
        resolve(accessTokenJson.access_token);  
    }
  })
  
};


module.exports = router;
