var express = require("express");
const fs = require("fs");
var router = express.Router();
const path = require("path");
var mongo = require("./shujukufangfafengzhuang.js");
var ObjectId = require("mongodb").ObjectID;
// 控制器
const userctrl = require("../controller/blogRegister");
const contentCtrl = require("../controller/blogContent");

router.get("/user/login", userctrl.login);
router.get("/user/register", userctrl.register);

router.post("/content/index", contentCtrl.contentIndex);
module.exports = router;
