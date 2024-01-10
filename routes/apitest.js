var express = require("express");
var router = express.Router();
const wxtoken_Controller = require("../controller/wx/wxtoken_Controller")
const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller")
const firstHome_Controller = require("../controller/wx/firstHome_Controller")
const wxCheckLogin = require("../middleware/wxCheckLogin");
const course = require("../middleware/course/index");
const userAccess_Controller = require('../controller/admin/userAccess_Controller');
const get_userAccess_Controller = require('../controller/admin/get_userAccess_Controller');
const wx_GetUser_controller = require('../controller/admin/wx_GetUser_controller');
const homemaking = require('../controller/homemakingService/homemakingUser');
const wapLogin = require("../controller/admin/login");
const Login = require("../middleware/checkLogin");
const orderPay = require("../controller/orderPay/index");
const Bills = require("../controller/bills/bills_Controller");

// 获取微信小程序 
router.post("/wxtoken", wxtoken_Controller, (req, res, next) => {
  // console.log(req.query.jsonTokenTime.access_token,'dsasdasdasd获取微信小程序')
  res.json({
    data: req.query.jsonTokenTime.access_token || '0',
    result: 1,
    msg: ''
  })
});

// 微信小程序登录
// userAccess_Controller
router.get("/wxMiniLogin", wxtoken_Controller, wxMiniLogin_Controller, wapLogin);
// 微信小程序首页
router.get("/firstHome", wxCheckLogin, firstHome_Controller);

// NBA文章详情
const article_model = require('../models/course/Article/Article')

router.get("/getArticle", async (req, res, next) => {
  let articleId = req.query.articleId;
  let arr = await article_model.find({ id: articleId });
  res.status(200).json({
    msg: "",
    data: arr[0],
    result: 1,
  })
});
// 根据课程id获取课程详情
router.get("/getCourse", wxCheckLogin, course.courseList);
// 记录
// router.get("/userAccess", userAccess_Controller);
router.get("/get_userAccess", get_userAccess_Controller);
router.get("/getMember", wxCheckLogin, wx_GetUser_controller);

// 家政服务
router.post("/homeMaking_list", Login.checkLogin, wxCheckLogin, homemaking.homemakingList);
router.post("/homeMakingAddUser", Login.checkLogin, wxCheckLogin, homemaking.addHomemaking);
router.post("/updateWorkStatus", Login.checkLogin, wxCheckLogin, homemaking.updateWorkStatus);
router.post("/updateHomeWork", Login.checkLogin, wxCheckLogin, homemaking.updateWorkStatus);
router.post("/homeMakingDeleteUser", Login.checkLogin, wxCheckLogin, homemaking.homework_delete);
router.post("/homework_creatOrder", Login.checkLogin, wxCheckLogin, orderPay.homeMakingOrder);
router.post("/FindAdmin", Login.checkLogin, wxCheckLogin, homemaking.findAdmin);
router.post("/homeMakingCode", wxtoken_Controller, Login.checkLogin, wxCheckLogin, homemaking.homeMakingCode);
router.post("/homeMakingReachSign", wxtoken_Controller, Login.checkLogin, homemaking.homeMakingReachSign);
// 记账本
router.get("/Bills_index", wxtoken_Controller, Login.checkLogin, wxCheckLogin, Bills.index);
router.post("/Bills_index", wxtoken_Controller, Login.checkLogin, wxCheckLogin, Bills.index);
router.post("/Bills_count", wxtoken_Controller, Login.checkLogin, wxCheckLogin, Bills.add);
module.exports = router;
