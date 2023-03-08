var parseString = require("xml2js").parseString;
var msg = require("../js/ismsg");
var config = require("../js/isWcConfig");
var accessTokenJson = require("../js/wcAccess_token");
var util = require("util");
var menu = require("../js/menu");
const fs = require("fs");
const path = require("path");
const request = require("request"); //http请求模块


const accessToken = async (req, res, next) => {
  await getAccessToken().then(function (data) {
    var url = util.format(config.diyApi.createMenu, config.prefix, data);
    // requestPost(url,JSON.stringify(menu)).then(function(data){
    //     //将结果打印
    //     // console.log(data);
    // });
  });
  var buffer = [],
    that = this;
  req.on("data", function (data) {
    buffer.push(data);
  });
  req.on("end", function () {
    var msgXml = Buffer.concat(buffer).toString("utf-8");
    parseString(msgXml, { explicitArray: false }, function (err, result) {
      // 如果有错误直接抛出
      if (err) throw err;
      result = result.xml;

      var toUser = result.ToUserName;
      var fromUser = result.FromUserName;
      var resultXml = "";
      // console.log(result)
      console.log(result.MsgType);
      // 判断消息类型
      if (result.MsgType === "event") {
        console.log(result.Event);
        // 关注微信公众号
        if (result.Event === "subscribe") {
          resultXml = msg.textMsg(fromUser, toUser, "欢迎关注，哈哈哈哈！");
          res.send(resultXml);
        } else if (result.Event === "CLICK") {
          console.log(result.EventKey);
          resultXml = msg.EventReply(fromUser, toUser, result.EventKey);
          // console.log(resultXml);
          res.send(resultXml);
        } else if (result.Event === "view") {
          // resultXml = msg.textMsg(fromUser, toUser, "欢迎关注，哈哈哈哈！");
          // res.send(resultXml);
        }
      } else {
        if (result.MsgType === "text") {
          console.log(result.Content);
          if (result.Content == "1") {
            resultXml = msg.textMsg(fromUser, toUser, "你好呀，我们又见面了！");
            res.send(resultXml);
            return;
          } else {
            resultXml = msg.textMsg(fromUser, toUser, "你是不是猪别");
            res.send(resultXml);
            return;
          }
        }
      }
    });
  });
}

/**
 * 封装请求get
 */
 let requestGet = function (url) {
  return new Promise(function (resolve, reject) {
    request(url, (error, response, body) => {
      resolve(body);
    });
  });
};




//获取全局access_token
let getAccessToken = function () {
  return new Promise(function (resolve, reject) {
    var currentTime = new Date().getTime();
    //格式化请求地址，把刚才的%s按顺序替换
    var url = util.format(
      config.diyApi.getAccessToken,
      config.prefix,
      config.appID,
      config.appScrect
    );
    if (
      accessTokenJson.access_token === "" ||
      accessTokenJson.expires_time < currentTime
    ) {
      requestGet(url).then(function (data) {
        var result = JSON.parse(data);
        if (data.indexOf("errcode") < 0) {
          accessTokenJson.access_token = result.access_token;
          accessTokenJson.expires_time =
            new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
          console.log("更新本地存储的" + result);
          //更新本地存储的
          let PUBLIC_PATH = path.resolve(
            __dirname,
            "../js/wcAccess_token.json"
          );
          console.log(PUBLIC_PATH, "2222222222", accessTokenJson);
          fs.writeFile(
            PUBLIC_PATH,
            JSON.stringify(accessTokenJson),
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
          resolve(accessTokenJson.access_token);
        } else {
          console.log("本地存储的");
          // resolve(result);
        }
      });
    } else {
      //将本地存储的 access_token 返回
      resolve(accessTokenJson.access_token);
    }
  });
};
module.exports = accessToken