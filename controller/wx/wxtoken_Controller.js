const request = require("request"); //http请求模块
const path = require("path");
const fs = require("fs");

const miniToken = async (req, res, next) => {
  let dayTime = Date.parse(new Date()) / 1000;
  let PUBLIC_PATH = path.resolve(__dirname, "../../js/miniToken.json");
  // console.log(dayTime,Date.parse(new Date())/1000);
  await fs.readFile(PUBLIC_PATH, (err, data) => {
    if (err) throw err
    // console.log(JSON.parse(data.toString()).expires_in)
    let jsonTokenTime = JSON.parse(data.toString()).expires_in;
    if (!jsonTokenTime || dayTime > jsonTokenTime) {
      // 凭证过期
      requestGet(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe6d74c44b857ba7b&secret=00c2105ad289a858de30209a10b73295`
      ).then((data) => {
        let accessToken = JSON.parse(data);
        // console.log(accessToken.expires_in,dayTime)
        accessToken.expires_in = Number(dayTime) + Number(accessToken.expires_in);
        // console.log(accessToken.expires_in)
        fs.writeFile(PUBLIC_PATH, JSON.stringify(accessToken), function (err) {
          if (err) {
            console.log(err);
          }
        });
        next();
      });
    } else {
      // 没过期
      console.log('wxtoken_Controller凭证没有过期')
      // res.json({
      //   data: JSON.parse(data.toString())
      // })
      next();
    }
  })


};
module.exports = miniToken;

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
