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
    let ispath = req.protocol + "://" + req.get("host");
    await fs.readdir("./uploads/code", (err, data) => {
      let truePath = `card_id_${uid}.png`;
      console.log(data, "dddddddd");
      if (data.length <= 0) {
        req.body.img = `${ispath}/uploads/code/card_id_${uid}.png`;
        next();
        return;
      }
      data.forEach((element) => {
        if (truePath == element) {
          if (nameRoute == "/appiontmentSignCode") {
            req.body.img = `${ispath}/uploads/code/${element}`;
            next();
          } else {
            res.send({
              result: 1,
              data: {
                img: `${ispath}/uploads/code/${element}`,
              },
              msg: "",
            });
          }
        }
      });
    });
    let base64;
    let urlCallBack = "http://localhost:3000/";
    if (nameRoute == "/appiontmentSignCode") {
      urlCallBack = `${req.protocol}://${req.get("host")}/signIn.html`;
      console.log(req.protocol + "://" + req.get("host"));
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
    await fs.writeFile(imgpath, base64, "base64", function (err) {
      if (err) {
        console.log(err, "eeerrr");
      } else {
        console.log("写入成功", imgpath);
        // res.send({
        //   result: 1,
        //   data: imgpath,
        //   msg: 'success',
        // })
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
