// 1. 引入配置好的multerConfig
const multerConfig = require("./multerConfig");

// 2. 定义静态变量
const fileName = "file"; // 上传的 fileName 名称
const updateBaseUrl = "http://localhost:3000"; // 上传到服务器地址
// const imgPath = "/uploads/"; // 上传到服务器的虚拟目录

// 上传接口的 请求参数req  响应参数res
function upload(req, res, imgPath) {
  return new Promise((resolve, reject) => {
    multerConfig.single(fileName)(req, res, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // `req.file.filename`  请求文件名称后缀
        // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
        if(req.url == '/homemaking_posts'){
          resolve(`${req.protocol}://${req.get('host')}/uploads/homeMakingPpsts/${req.file.filename}`);
        }else{
          resolve(`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`);
        }
      }
    });
  });
}

module.exports = upload;
