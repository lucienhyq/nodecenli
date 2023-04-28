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
// 获取微信小程序 
router.post("/wxtoken", wxtoken_Controller);

// 微信小程序登录
router.get("/wxMiniLogin", wxMiniLogin_Controller);
// 微信小程序首页
router.get("/firstHome", firstHome_Controller);

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
router.get("/userAccess", userAccess_Controller);
router.get("/get_userAccess", get_userAccess_Controller);


// const courseLikeMethod_model = require('../models/course/Article/like.js');
// const article_model = require('../models/course/Article/Article.js');
// const admin_model = require('../models/admin/admin');
// const { json } = require("body-parser");
// router.get("/courseLikeMethod", async (req, res, next) => {
//   let articleId = '64473128f5c4dd920fb9322f';
//   let userId = '23';
//   let user = await admin_model.find({ id: userId })
//   console.log(user[0]._id)
//   await courseLikeMethod_model.create({
//     article: articleId,
//     user: user[0]._id
//   })
//   res.status(200).send({
//     result: 1,
//     msg: '',
//     data: ''
//   })
// })
// router.get("/article", async (req, res, next) => {
//   let json = {
//     title: '文章1',
//     conten: '文章测试'
//   }
//   let list = await article_model.create(json)
//   res.status(200).send({
//     result: 1,
//     msg: '',
//     data: list
//   })
// })
// // 获取文章点赞
// router.get("/getArticleLike", async (req, res, next) => {
//   let userId = '23';
//   let user = await admin_model.find({ id: userId })
//   let list = []
//   article_model.find({}, async (err) => {
//     if (err) {
//       throw new Error('查询错误')
//     }
//     courseLikeMethod_model.find({ user: user }, (error, lik) => {
//       console.log(lik, '文章得点赞查找')
//       list = lik
//       res.status(200).send({
//         result: 1,
//         msg: '',
//         data: lik
//       })
//     })
//   })
// })

module.exports = router;
