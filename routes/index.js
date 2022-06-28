var express = require('express');
var router = express.Router();
// const AdminModel = require('../models/admin/admin');
// const dtime = require('time-formater');
// const getIdmethod = require('../prototype/ids');
const register_Controller = require('../controller/admin/register')
const login_Controller = require('../controller/admin/login')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect("index.html");
});
// 注册
router.post('/register', register_Controller);
// 登录
router.post('/login',login_Controller)

module.exports = router;
