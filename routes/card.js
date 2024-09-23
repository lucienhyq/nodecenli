var express = require("express");
var router = express.Router();
const upload = require("../js/upload");
const wxCheckLogin = require("../middleware/wxCheckLogin");
const { checkLogin, checkLoginUser } = require("../middleware/checkLogin");
var {
  instance: cardControllerInstance,
  card_controller,
} = require("../middleware/card/card");
// 获取卡片
router.post(
  "/card_Index",
  checkLogin,
  wxCheckLogin,
  cardControllerInstance.card_Index
);
// 保存
router.post(
  "/setting/save",
  checkLogin,
  wxCheckLogin,
  card_controller.validateInput(),
  cardControllerInstance.card_setting_save
);

router.get(
  "/setting/save",
  checkLogin,
  wxCheckLogin,
  card_controller.validateInput(),
  cardControllerInstance.card_setting_save
);
// 保存 end
// 上传图片
router.post("/cardUpload", handleUpload);
function handleUpload(req, res, next) {
  upload(req, res)
    .then((imgsrc) => {
      console.log(imgsrc, "ddddddd");
      res.send({ data: imgsrc, result: 1 });
    })
    .catch((err) => {
      res.status(500).send({
        data: "",
        mgs: err,
        result: 0,
      });
    });
}
module.exports = router;
