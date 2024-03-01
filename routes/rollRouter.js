var express = require("express");
var router = express.Router();
const roll = require("../controller/roll/roll_controller");

// 获取图片列表
router.get("/rollImgList", roll.rollimageList_get);
// 新闻
router.get("/getNewType", roll.roll_getNewType_get);
router.get("/getNewList", roll.roll_getNewList_get);
router.get("/getNewDetails", roll.roll_getNewDetails_get);
// 历史上的今天
router.get("/getToday", roll.roll_getToday_get);
// 设置
router.get("/roll_setting",roll.roll_setting);
module.exports = router;
