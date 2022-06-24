var express = require('express');
var router = express.Router();
// const AdminModel = require('../models/admin/admin');
// const dtime = require('time-formater');
// const getIdmethod = require('../prototype/ids');
const login_Controller = require('../controller/admin/login')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect("yanzm.html");
});
// 登录
router.get('/login', login_Controller);


module.exports = router;
