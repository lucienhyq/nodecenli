var express = require("express");
const fs = require("fs");
var router = express.Router();
const path = require("path");
const wxtoken_Controller = require("../controller/wx/wxtoken_Controller")
const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller")
const firstHome_Controller = require("../controller/wx/firstHome_Controller")
const request = require('request')       //网络请求
const cheerio = require("cheerio");  //爬虫 扩展模块
const wxCheckLogin = require("../middleware/wxCheckLogin")
const courseList_Controller = require('../controller/course/courseList_Controller');
const userAccess_Controller = require('../controller/admin/userAccess_Controller');
const get_userAccess_Controller = require('../controller/admin/get_userAccess_Controller');
const wx_GetUser_controller = require('../controller/admin/wx_GetUser_controller');
const homeMakingAddUser_controller = require('../controller/homemakingService/homemakingUser');
const wapLogin = require("../controller/admin/login");
// const logger = require('../logs/logs').logger;
// 获取微信小程序 
router.post("/wxtoken", wxtoken_Controller);

// 微信小程序登录
router.get("/wxMiniLogin", wxtoken_Controller, userAccess_Controller, wxMiniLogin_Controller, wapLogin);
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
router.get("/getCourse", courseList_Controller);
// 记录
// router.get("/userAccess", userAccess_Controller);
// router.get("/get_userAccess", get_userAccess_Controller);
router.get("/getMember", wxCheckLogin, wx_GetUser_controller);

router.post("/homeMaking_list", async (req, res, next) => {
  console.log('dssadasdsd')
  next()
}, async (req, res, next) => {
  res.status(200).json({
    msg: "",
    data: '',
    result: 1,
  })
})
router.post("/homeMakingAddUser", homeMakingAddUser_controller);

module.exports = router;
