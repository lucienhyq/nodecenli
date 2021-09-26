var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');
var mongo = require("./shujukufangfafengzhuang.js");
var ObjectId = require('mongodb').ObjectID;
//加密模块
var crypto = require("crypto");
function User(users){
	this.name=users.name;//登录人账号
	this.veri=users.veri;
	this.password=users.password;
	this.id=users.id;
}

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
  let resuleData = checkLogin(req); //检查登录
  if(resuleData.result){
    mongo("find", "list_order_li", {}, function (data) {
      if (data.length != 0) {
        res.send(data)
      } else {
        res.send('{"err":"用户信息获取失败"}');
      }
    })
  }else{
    res.send(resuleData);
  }
  
});

let checkLogin = function(req){
  console.log(req.session.user,'ssssssss');
  if(req.session.user){
    mongo("find","user",{userName:req.session.user.userName},function(data){
      console.log(data)
    })
    if(req.session.user.userName){
      return {'result':1,'msg':'已登录'}
    }else{
      return {'result':0,'msg':'请登录'}
    }
  }else{
    var newUser=new User({
      name:'',
      veri:'',
      password:'',
      id:''
    })
    req.session.user=newUser;
    return {'result':0,'msg':'请登录'}
  }
}
module.exports = router;