var express = require("express");
var router = express.Router();
const wxtoken_Controller = require("../controller/wx/wxtoken_Controller");
const wxMiniLogin_Controller = require("../controller/wx/wxMiniLogin_Controller");
const firstHome_Controller = require("../controller/wx/firstHome_Controller");
const wxCheckLogin = require("../middleware/wxCheckLogin");
const course = require("../middleware/course/index");
const userAccess_Controller = require("../controller/admin/userAccess_Controller");
const get_userAccess_Controller = require("../controller/admin/get_userAccess_Controller");
const wx_GetUser_controller = require("../controller/admin/wx_GetUser_controller");
const homemaking = require("../controller/homemakingService/homemakingUser");
const wapLogin = require("../controller/admin/login");
const { checkLogin } = require("../middleware/checkLogin");
const orderPay = require("../controller/orderPay/index");
const Bills = require("../controller/bills/bills_Controller");
const Weather = require("../controller/tool/Weather");
const music_score_from = require("../controller/music_score_from/music_score_from");
const movieController = require("../middleware/movie");

// const Music_score = require("../")
// 获取微信小程序
router.post("/wxtoken", wxtoken_Controller, (req, res, next) => {
  // console.log(req.query.jsonTokenTime.access_token,'dsasdasdasd获取微信小程序')
  res.json({
    data: req.query.jsonTokenTime.access_token || "0",
    result: 1,
    msg: "",
  });
});

// 微信小程序登录
// userAccess_Controller
router.get(
  "/wxMiniLogin",
  wxtoken_Controller,
  wxMiniLogin_Controller,
  wapLogin
);
// 微信小程序首页
router.get("/firstHome", firstHome_Controller.firstHome);
// 获取nba新闻详情
router.get("/getNbaNews", firstHome_Controller.getNewsList);
router.get("/getStartDetail", firstHome_Controller.getStartDetail);
// 点赞
router.get(
  "/likeTapMethod",
  checkLogin,
  firstHome_Controller.Like
  // (req, res, next) => {
  //   console.log(req.user._id, req.query.article);
  //   // like_model.create({})
  //   let json = {
  //     user: req.user._id, //会员id
  //     article: req.query.article, // 文章id
  //   };
  //   let likeDoc = like_model.countDocuments((err, count) => {
  //     return count;
  //   });
  //   console.log(likeDoc, "22222222222222222");
  //   res.send("ddddddddddd");
  // }
);
router.get("/getLike", firstHome_Controller.getLike);
// 不太灵影视 搜索列表
router.get("/searchVideoList", movieController.searchMovie);
// 不太灵影视 电影首页
router.get("/getMovieIndex", movieController.getMovieIndex);
router.get("/getTvseriesIndex", movieController.getMovieIndex);
// NBA文章详情

router.get("/getArticle", async (req, res, next) => {
  let articleId = req.query.articleId;
  let arr = await article_model.find({ id: Number(articleId) });
  res.status(200).json({
    msg: "",
    data: arr[0],
    result: 1,
  });
});
// 根据课程id获取课程详情
router.get("/getCourse", wxCheckLogin, course.courseList);

router.get(
  "/get_userAccess",
  checkLogin,
  userAccess_Controller,
  get_userAccess_Controller
);
router.get("/getMember", wxCheckLogin, wx_GetUser_controller);

// 家政服务
router.post(
  "/homeMaking_list",
  checkLogin,
  wxCheckLogin,
  homemaking.homemakingList
);
router.post(
  "/homeMakingAddUser",
  checkLogin,
  wxCheckLogin,
  homemaking.addHomemaking
);
router.post(
  "/updateWorkStatus",
  checkLogin,
  wxCheckLogin,
  homemaking.updateWorkStatus
);
router.post(
  "/updateHomeWork",
  checkLogin,
  wxCheckLogin,
  homemaking.updateWorkStatus
);
router.post(
  "/homeMakingDeleteUser",
  checkLogin,
  wxCheckLogin,
  homemaking.homework_delete
);
router.post(
  "/homework_creatOrder",
  checkLogin,
  wxCheckLogin,
  orderPay.homeMakingOrder
);
router.post("/FindAdmin", checkLogin, wxCheckLogin, homemaking.findAdmin);
router.post(
  "/homeMakingCode",
  wxtoken_Controller,
  checkLogin,
  wxCheckLogin,
  homemaking.homeMakingCode
);
router.post(
  "/homeMakingReachSign",
  wxtoken_Controller,
  checkLogin,
  homemaking.homeMakingReachSign
);
router.post("/test", orderPay.testUpdateHmOrder);
// 记账本
router.get(
  "/Bills_index",
  wxtoken_Controller,
  checkLogin,
  wxCheckLogin,
  Bills.index
);
router.post(
  "/Bills_index",
  wxtoken_Controller,
  checkLogin,
  wxCheckLogin,
  Bills.index
);
router.post(
  "/Bills_count",
  wxtoken_Controller,
  checkLogin,
  wxCheckLogin,
  Bills.add
);
router.get(
  "/Weather_updateAppKey",
  wxtoken_Controller,
  checkLogin,
  wxCheckLogin,
  Weather.updateAppKey
);
router.get("/Weather_Get", Weather.Weather_get);
// 创建表单
router.post(
  "/createForm",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findUid,
  music_score_from.createAGradeForm
);
// 获取表单数据
router.post(
  "/getGradeFormList",
  wxtoken_Controller,
  checkLogin,
  music_score_from.getGradeFormList
);
// 查找指定表单数据
router.get(
  "/findFormId",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findFormId_list
);
// 更新指定表单
router.post(
  "/updateForm",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findUid,
  music_score_from.updateForm
);
// 删除表单
router.post(
  "/delForm",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findUid,
  music_score_from.delForm
);
// 记录音乐赛区表单
router.post(
  "/musicFormRecord",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findUid,
  music_score_from.findFormId,
  music_score_from.musicFormRecord
);
// 查看表单的提交列表
router.get(
  "/musicFormRecord_list",
  wxtoken_Controller,
  checkLogin,
  music_score_from.findUid,
  music_score_from.findFormId,
  music_score_from.musicFormRecord_list
);
module.exports = router;
