var express = require("express");
const fs = require("fs");
var router = express.Router();
const path = require("path");
const wxtoken_Controller = require("../controller/wx/wxtoken_Controller")
const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller")
// 获取微信小程序 
router.post("/wxtoken", wxtoken_Controller);

// 微信小程序登录
router.get("/wxMiniLogin", wxMiniLogin_Controller);

module.exports = router;
