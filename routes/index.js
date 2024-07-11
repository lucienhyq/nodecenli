var express = require("express");
var router = express.Router();
// 会员信息model
const AdminModel = require("../models/admin/admin");
// 路由控制器 中间件
const register_Controller = require("../controller/admin/register");
const login_Controller = require("../controller/admin/login");
const {
  userList,
  userEdit,
  addUser,
} = require("../controller/admin/usetEdit_Controller");
const referee_all_Controller = require("../controller/refereeController/referee_all");
const referee_add_Controller = require("../controller/refereeController/referee_add");
const referee_update_Controller = require("../controller/refereeController/referee_update");
const referee_search_Controller = require("../controller/refereeController/referee_search");
const acquirePost_Controller = require("../controller/acquirePost");
const qrCode_Controller = require("../controller/qrCode");
const outLogin_Controller = require("../controller/outLogin");
const multipart = require("connect-multiparty");
const course = require("../middleware/course/index");
const appiontment = require("../middleware/appointment/appointmentMid");
// const coursePay_Controller = require("../controller/course/coursePay_Controller");
// const orderPay_Controller = require("../controller/orderPay_Controller");
const appointmentIndex_Controller = require("../controller/course/appointmentIndex_Controller");
const appointmentRecord_Controller = require("../controller/course/appointmentRecord_Controller");
// 获取预约签到二维码
const appiontmentSignCode_Controller = require("../controller/course/appiontmentSignCode_Controller");
const wxIndex_Controller = require("../controller/wx/index");
const wxaccessToken_Controller = require("../controller/wx/index");
// 中间件
const upload = require("../js/upload");
const { checkLogin, checkLoginUser } = require("../middleware/checkLogin");
const multipartMiddleware = multipart();
const referee = require("../controller/refereeController/referee");
const wxCheckLogin = require("../middleware/wxCheckLogin");
// 创建订单
const orderController = require("../controller/orderPay/index");
const userAccess_Controller = require("../controller/admin/userAccess_Controller");
const {
  homemakingList,
} = require("../controller/homemakingService/homemakingUser");
// const request = require("request"); //http请求模块

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.redirect("index.html");
// });
// 检查是否有登录
router.post("/checkLoginUser", checkLogin, checkLoginUser);
router.get("/checkLoginUser", checkLogin, checkLoginUser);
// 注册
router.get("/register", register_Controller);

// 登录
router.post("/login", login_Controller);
router.get("/login", login_Controller);

router.get("/memberList", checkLogin, userList);
router.post("/memberEdit", checkLogin, userEdit);
router.post("/memberAdd", checkLogin, addUser);
router.get("/homeSidebar", async (req, res) => {
  res.send({
    data: ["pcHome", "member","cardHome"],
    result: 1,
    msg: "成功",
  });
});

// 编辑会员信息
// router.post("/usetEdit", checkLogin, usetEdit_Controller);

// 上传图片
router.post("/posts", handleUpload);
function handleUpload(req, res, next) {
  upload(req, res)
    .then((imgsrc) => {
      res.send({ data: imgsrc, result: 1 });
    })
    .catch((err) => {
      formatErrorMessage(res, err);
    });
}
// 上传图片
router.post("/homemaking_posts", handleUpload);

// 获取会员信息
router.get("/getUserIndex", checkLogin, async (req, res) => {
  try {
    // 假设AdminModel的查询方法进行了优化，只查询必要的字段
    var user = await AdminModel.findOne({
      id: req.session.user.id,
    }).select({ user_name: 1, create_time: 1, id: 1, mobile: 1 });

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
// 裁判模块
router.post("/allReferee", checkLogin, referee_all_Controller);
router.post("/addReferee", checkLogin, referee_add_Controller);
router.post("/updateReferee", checkLogin, referee_update_Controller);
router.post("/searchReferee", checkLogin, referee_search_Controller);
router.post("/testClass", async (req, res, next) => {
  console.log(referee.addReferee);
});
// 爬虫demo
router.post("/acquirePost", multipartMiddleware, acquirePost_Controller);
router.get("/acquirePost", multipartMiddleware, acquirePost_Controller);
// 退出登录
router.get("/outLogin", outLogin_Controller);
router.post("/qrCode", multipartMiddleware, qrCode_Controller);
// 添加商品文章
router.post("/courseIndex", multipartMiddleware, course.addCourse);
// 获取商品列表
router.post(
  "/courseList",
  multipartMiddleware,
  checkLogin,
  wxCheckLogin,
  course.courseList
);

// 商品 更新
router.post(
  "/courseList_updateOne",
  multipartMiddleware,
  course.courseLisUpdate
);
router.get("/courseDelete", checkLogin, course.course_Delete);

router.post(
  "/courseCreate",
  multipartMiddleware,
  checkLogin,
  wxCheckLogin,
  orderController.coursePay
);
// 查看订单
router.post(
  "/orderCountList",
  checkLogin,
  wxCheckLogin,
  orderController.orderCountList
);
// 支付订单
// router.post("/orderPay", multipartMiddleware, orderPay_Controller);

// let secret = '71ef6ea6470f58dcd741c05f1493b11d';
// let appid = 'wxab206bb4cbe7857a';
// &appid=wxab206bb4cbe7857a&secret=71ef6ea6470f58dcd741c05f1493b11d

// 公众号接受用户发送的消息
router.post("/wx", wxaccessToken_Controller);
// 验证微信公众号 服务器
router.get("/wx", multipartMiddleware, wxIndex_Controller);

//签到 appointment
router.post(
  "/appointmentIndex",
  multipartMiddleware,
  checkLogin,
  appiontment.appiontment_record,
  appiontment.appiontment_add
);

// 签到记录
router.post(
  "/appointmentRecordAll",
  multipartMiddleware,
  checkLogin,
  appointmentRecord_Controller
);
// 获取签到二维码
router.post(
  "/appiontmentSignCode",
  checkLogin,
  async (req, res, next) => {
    if (!req.body.course_id) {
      res.send({
        result: 0,
        msg: "请输入活动id",
      });
      return;
    }
    next();
  },
  qrCode_Controller,
  appiontment.appiontmentSignCode
);
// 确认预约签到
router.post("/appointmentSingIn", checkLogin, appiontment.appointmentSingIn);
// 获取预约明细
router.post("/get_appointment", appiontment.get_appointment);

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || "",
  });
}

module.exports = router;
