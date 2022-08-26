var express = require("express");
const fs = require("fs");
var router = express.Router();
const path = require("path");
var mongo = require("./shujukufangfafengzhuang.js");
var ObjectId = require("mongodb").ObjectID;
// 控制器
const contentCtrl = require("../controller/blogContent");

router.get("/",function(req,res,next){
  console.log(':ddddddddddddddddd')
})
router.post("/index", contentCtrl.contentIndex);
module.exports = router;
