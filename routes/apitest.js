var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');
var mongo = require("./shujukufangfafengzhuang.js");
var ObjectId = require('mongodb').ObjectID;
//加密模块
var crypto = require("crypto");

/* GET home page. */
router.post('/test', function (req, res, next) {
  // res.redirect("yanzm.html");
  // res.send('奥地利');
  console.log(req.query.isimg)
  if (req.query.isimg && req.query.isimg == 1) {
    var apath = `/nodecenli/public/images/1.jpg`;
    // var apath = `/nodecenli/public/images/${req.query.url}`;
    fs.readFile(apath, 'binary', function (err, file) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(file, 'binary');
        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end();
  }

});
router.post('/overList', function (req, res, next) {
  console.log(req.body)
  mongo("add","list_order_li",req.body,function(result){
    if(result.length!=0){
    res.send('{"success":"创建成功"}')
  }else{
    res.send('{"success":"创建失败"}')
  }
})
});

// 检查是否登录
router.post('/checkUser', function (req, res, next) {
  console.log(req.body)
  mongo("find", "user", { userName: req.body.name }, function (data) {
    if (data.length != 0) {
      console.log(data[0].password)
      res.send(data[0])
    } else {
      res.send('{"err":"用户信息获取失败"}');
    }
  })
});

module.exports = router;