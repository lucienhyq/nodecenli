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

// 获取微信小程序 
router.post("/wxtoken", wxtoken_Controller);

// 微信小程序登录
router.get("/wxMiniLogin", wxMiniLogin_Controller);
// 微信小程序首页
router.get("/firstHome", firstHome_Controller);
// 虎扑文章详情
router.get("/getArticle", async (req, res, next) => {
  let url = "https://bbs.hupu.com/58837271.html";
  let resultArr = {
    conten: []
  };
  request(url, async (err, response, body) => {
    if (err) {
      // reject(err)
      res.status(400).json({
        msg: "资源错误",
        data: [],
        result: 0,
      })
    } else {
      const $ = cheerio.load(body);
      $(".thread-content-detail").each((iten, i) => {
        if (iten == 0) {
          $(i).find('p,p img').each((ind, item) => {
            if ($(item).text()) {
              resultArr.conten.push($(item).text());
            }
            if ($(item).attr("src")) {
              resultArr.conten.push($(item).attr("src"));
            }
          })
        }
      })
      if (JSON.stringify(resultArr) == '{}') {
        res.status(400).json({
          msg: "帖子不存在",
          data: [],
          result: 0,
        })
        return
      }
      res.status(200).json({
        msg: "",
        data: {
          bodyHtml: resultArr.conten
        },
        result: 1,
      })
    }
  })
});
// 根据课程id获取课程详情
router.get("/getCourse", courseList_Controller)
module.exports = router;
