var express = require('express');
var router = express.Router();
const AdminModel = require('../models/admin/admin');
const register_Controller = require('../controller/admin/register');
const login_Controller = require('../controller/admin/login');
const usetEdit_Controller = require('../controller/admin/usetEdit_Controller')
const referee_all_Controller = require('../controller/refereeController/referee_all');
const referee_add_Controller = require('../controller/refereeController/referee_add');
const referee_update_Controller = require('../controller/refereeController/referee_update');
const referee_search_Controller = require('../controller/refereeController/referee_search');
const acquirePost_Controller = require('../controller/acquirePost');
const qrCode_Controller = require('../controller/qrCode');
const outLogin_Controller = require('../controller/outLogin');
const checkLogin = require('../middleware/checkLogin');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// 1. 引入配置好的multerConfig
const upload = require('../js/upload');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect("index.html");
});
// 检查是否有登录
router.post('/checkLoginUser', async (req, res) => {
  if (!req.session.user) {
    res.send({ 'msg': '未登录', result: 0 });
  } else {
    try {
      let user = await AdminModel.findOne({ user_name: req.session.user.userName })
      res.send({
        result: 1,
        msg: '成功',
        data: user,
      })
    } catch (err) {
      formatErrorMessage(res, err.error)
    }
  }
})
router.get('/checkLoginUser', async (req, res) => {
  if (!req.session.user) {
    res.send({ 'msg': '未登录', result: 0 });
  } else {
    try {
      let user = await AdminModel.findOne({ user_name: req.session.user.userName })
      res.send({
        result: 1,
        msg: '成功',
        data: user,
      })
    } catch (err) {
      formatErrorMessage(res, err.error)
    }
  }
})
// 注册
router.post('/register', register_Controller);

// 登录
router.post('/login', login_Controller);

// 编辑会员信息
router.post('/usetEdit', checkLogin, usetEdit_Controller);

// 上传图片
router.post('/posts', (req, res) => {
  upload(req, res).then(imgsrc => {
    // 上传成功 存储文件路径 到数据库中
    res.send({ 'data': imgsrc, result: 1 });
  }).catch(err => {
    formatErrorMessage(res, err)
  })
});

// 获取会员信息
router.get('/getUserIndex', checkLogin, async (req, res) => {
  try {
    var user = await AdminModel.findOne({ user_name: req.session.user.userName })
    res.send({
      result: 1,
      msg: '成功',
      data: {
        member: user
      },
      session: req.session
    })
  } catch (err) {
    formatErrorMessage(res, err.error)
  }
})

router.post('/allReferee', checkLogin, referee_all_Controller);
router.post('/addReferee', checkLogin, referee_add_Controller);
router.post('/updateReferee', checkLogin, referee_update_Controller);
router.post('/searchReferee', checkLogin, referee_search_Controller);

router.post('/acquirePost',multipartMiddleware, acquirePost_Controller);
router.get('/acquirePost',multipartMiddleware, acquirePost_Controller);
router.get('/outLogin', outLogin_Controller);
router.post('/qrCode', checkLogin, qrCode_Controller);



// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}


module.exports = router;
