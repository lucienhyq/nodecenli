const QRCode = require("qrcode");
const fs = require("fs");
const logger = require("../logs/logs").logger;

const qrCode = async (req, res, next) => {
  // logger.info(req.body, req.route);
  let nameRoute = req.route.path;
  console.log(nameRoute);
  try {
    let uid = req.body.uid || req.session.user.uid;
    let imgpath = `./uploads/code/card_id_${uid}.png`;
    if (nameRoute == "/appiontmentSignCode") {
      imgpath = `./uploads/appointment/card_id_${uid}.png`;
    }
    let ispath = req.protocol + "://" + req.get("host");
    let base64;
    let urlCallBack = "http://localhost:3000/";
    if (nameRoute == "/appiontmentSignCode") {
      urlCallBack = `${req.protocol}://${req.get("host")}/signIn.html?uid=${uid}&apid=${req.body.id}`;
    }
    await QRCode.toDataURL(urlCallBack)
      .then((url) => {
        let base64_URL = url;
        base64 = base64_URL.replace(/^data:image\/\w+;base64,/, "");
      })
      .catch((err) => {
        console.log(err, "wwwwwwwwwwwwww");
        res.send({
          result: 0,
          data: "",
          msg: err,
        });
      });
    let folderPath = './uploads/code'; // 新文件夹路径
    if (nameRoute == '/appiontmentSignCode') {
      folderPath = './uploads/appointment'
    }
    // console.log(fs.existsSync(folderPath), folderPath)
    await fs.mkdir(folderPath, (err) => {
      if (err) {
        console.log('文件夹已创建');
      }
    })
    fs.writeFile(imgpath, base64, "base64", function (err) {
      if (err) {
        console.log(err, "eeerrr");
        if (err) throw new Error('222222222');
      } else {
        console.log("写入成功", imgpath);
        if (nameRoute == '/appiontmentSignCode') {
          req.body.img = `${ispath}/uploads/appointment/card_id_${uid}.png`;
          next();
        } else {
          res.send({
            result: 1,
            data: `${ispath}/uploads/code/card_id_${uid}.png`,
            msg: 'success',
          })
        }
      }
    });

  } catch (error) {
    formatErrorMessage(res, error);
    logger.error("error" + error);
  }
};
// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: String(message),
  });
}
module.exports = qrCode;




// await fs.readdir("./uploads/code", (err, data) => {
    //   let truePath = `card_id_${uid}.png`;
    //   console.log(data, "dddddddd");
    //   if (data.length <= 0) {
    //     req.body.img = `${ispath}/uploads/code/card_id_${uid}.png`;
    //     next();
    //     return;
    //   }
    //   data.forEach((element) => {
    //     if (truePath == element) {
    //       if (nameRoute == "/appiontmentSignCode") {
    //         req.body.img = `${ispath}/uploads/code/${element}`;
    //         next();
    //       } else {
    //         res.send({
    //           result: 1,
    //           data: {
    //             img: `${ispath}/uploads/code/${element}`,
    //           },
    //           msg: "",
    //         });
    //       }
    //     }
    //   });
    // });