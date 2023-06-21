var express = require("express");
var router = express.Router();
// 会员信息model
const AdminModel = require("../models/admin/admin");
// 路由控制器 中间件
const register_Controller = require("../controller/admin/register");
const login_Controller = require("../controller/admin/login");
const usetEdit_Controller = require("../controller/admin/usetEdit_Controller");
const referee_all_Controller = require("../controller/refereeController/referee_all");
const referee_add_Controller = require("../controller/refereeController/referee_add");
const referee_update_Controller = require("../controller/refereeController/referee_update");
const referee_search_Controller = require("../controller/refereeController/referee_search");
const acquirePost_Controller = require("../controller/acquirePost");
const qrCode_Controller = require("../controller/qrCode");
const outLogin_Controller = require("../controller/outLogin");
const multipart = require("connect-multiparty");
const courseIndex_Controller = require("../controller/course/courseIndex_Controller");
const courseList_Controller = require("../controller/course/courseList_Controller");
const coursePay_Controller = require("../controller/course/coursePay_Controller");
const orderPay_Controller = require("../controller/orderPay_Controller");
const appointmentIndex_Controller = require("../controller/course/appointmentIndex_Controller");
const wxIndex_Controller = require("../controller/wx/index");
const wxaccessToken_Controller = require("../controller/wx/index");
// 中间件
const upload = require("../js/upload");
const checkLogin = require("../middleware/checkLogin");
const multipartMiddleware = multipart();
// const request = require("request"); //http请求模块

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("index.html");
});
// 检查是否有登录
router.post("/checkLoginUser", checkLogin, async (req, res) => {
  console.log(req.user, '212121checkLoginUser')
  let userInfo = await AdminModel.findOne({
    id: req.user.id,
  });
  console.log(userInfo)
  if (req.user) {
    res.send({
      result: 1,
      msg: "成功",
      data: userInfo,
    });
  }

});
router.get("/checkLoginUser", checkLogin, async (req, res) => {
  let userInfo = await AdminModel.findOne({
    id: req.user.id,
  });
  console.log(userInfo)
  if (req.user) {
    res.send({
      result: 1,
      msg: "成功",
      data: userInfo,
    });
  }
});
// 注册
router.post("/register", register_Controller);

// 登录
router.post("/login", login_Controller);

// 编辑会员信息
router.post("/usetEdit", checkLogin, usetEdit_Controller);

// 上传图片
router.post("/posts", (req, res) => {
  upload(req, res)
    .then((imgsrc) => {
      // 上传成功 存储文件路径 到数据库中
      res.send({ data: imgsrc, result: 1 });
    })
    .catch((err) => {
      formatErrorMessage(res, err);
    });
});

// 获取会员信息
router.get("/getUserIndex", checkLogin, async (req, res) => {
  try {
    var user = await AdminModel.findOne({
      user_name: req.session.user.userName,
    });
    res.send({
      result: 1,
      msg: "成功",
      data: {
        member: user,
      },
      session: req.session,
    });
  } catch (err) {
    formatErrorMessage(res, err.error);
  }
});

router.post("/allReferee", checkLogin, referee_all_Controller);
router.post("/addReferee", checkLogin, referee_add_Controller);
router.post("/updateReferee", checkLogin, referee_update_Controller);
router.post("/searchReferee", checkLogin, referee_search_Controller);

router.post("/acquirePost", multipartMiddleware, acquirePost_Controller);
router.get("/acquirePost", multipartMiddleware, acquirePost_Controller);
router.get("/outLogin", outLogin_Controller);
router.post("/qrCode", checkLogin, qrCode_Controller);
// 添加课程文章
router.post("/courseIndex", multipartMiddleware, courseIndex_Controller);
// 获取课程文章列表
router.post("/courseList", multipartMiddleware, courseList_Controller);
// 课程文章创建订单
router.get(
  "/courseCreate",
  multipartMiddleware,
  checkLogin,
  coursePay_Controller
);
// 支付订单
router.post("/orderPay", multipartMiddleware, orderPay_Controller);
//签到
router.post(
  "/appointmentIndex",
  multipartMiddleware,
  appointmentIndex_Controller
);

// let secret = '71ef6ea6470f58dcd741c05f1493b11d';
// let appid = 'wxab206bb4cbe7857a';
// &appid=wxab206bb4cbe7857a&secret=71ef6ea6470f58dcd741c05f1493b11d

// 公众号接受用户发送的消息
router.post("/wx", wxaccessToken_Controller);
// 验证微信公众号 服务器
router.get("/wx", multipartMiddleware, wxIndex_Controller);


// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || "",
  });
}


module.exports = router;
