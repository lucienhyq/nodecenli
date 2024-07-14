// 1. 引入依赖
const multer = require("multer");
const md5 = require("md5");
const fs = require("fs");

// 2. 引入工具
const path = require("path"); //
const resolve = (dir) => {
  return path.join(__dirname, "./", dir);
};

// 3. multer的配置对象
let storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function (req, file, cb) {
    console.log(req.url, "ddddddddd");
    // 3.1.1 允许图片上传
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      let targetDir;
      if (req.url == "/homemaking_posts") {
        targetDir = resolve("../uploads/homeMakingPpsts");
      } else if (req.url == '/cardUpload') {
        targetDir = resolve("../uploads/cardUpload");
      } else {
        targetDir = resolve("../uploads/");
      }

      // 检查目标目录是否存在，不存在则创建
      fs.access(targetDir, fs.constants.F_OK, (err) => {
        if (err) {
          // 目录不存在，创建目录
          fs.mkdir(targetDir, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
              cb(mkdirErr);
            } else {
              cb(null, targetDir);
            }
          });
        } else {
          // 目录存在，直接使用
          cb(null, targetDir);
        }
      });
    } else {
      // 3.1.2 限制其他文件上传类型
      cb({ error: "Mime type not supported上传类型不支持" });
    }
  },
  //  3.2 存储名称
  filename: function (req, file, cb) {
    let fileFormat = file.originalname.split(".");
    // if (req.url == "/homemaking_posts") {
    //     cb(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
    //   return;
    // }
    cb(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
  },
});

// 4. 添加配置
const multerConfig = multer({
  storage: storage,
});

// 5. 导出配置好的multerConfig
module.exports = multerConfig;
