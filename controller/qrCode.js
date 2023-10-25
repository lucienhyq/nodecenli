const QRCode = require("qrcode");
const fs = require("fs");
const logger = require("../logs/logs").logger;

const qrCode = async (req, res, next) => {
  // logger.info(req.body, req.route);
  let nameRoute = req.route.path;
  // console.log(nameRoute,req.body);
  try {
    let uid = req.session?.user?.id || req?.user?.id;
    let imgpath = `./uploads/code/card_id_${uid}.png`;
    let ispath = req.protocol + "://" + req.get("host");
    let base64;
    let urlCallBack = req.protocol + "://" + req.get("host");
    if (nameRoute == "/appiontmentSignCode") {
      imgpath = `./uploads/appointment/card_id_${uid}_${req.body.course_id}.png`;
      // urlCallBack = `${req.protocol}://${req.get("host")}/#/decode?courseId=${req.body.course_id}`;
      urlCallBack = `${req.protocol}://${req.get("host")}/#/signIn.html?uid=${uid}&apid=${req.body.course_id}`;
    }
    await QRCode.toDataURL(urlCallBack)
      .then((url) => {
        let base64_URL = url;
        base64 = base64_URL.replace(/^data:image\/\w+;base64,/, "");
      })
      .catch((err) => {
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
          req.body.img = `${ispath}${imgpath}`;
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
