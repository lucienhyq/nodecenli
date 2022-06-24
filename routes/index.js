var express = require('express');
var router = express.Router();
const AdminModel = require('../models/admin/admin');
const dtime = require('time-formater');
const formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect("yanzm.html");
});
router.get('/test', async (req, res, next) => {
	var user = await AdminModel.findOne({ user_name: 'swag' })
	const form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		console.log(fields,'ddddddddddddddd')
	})
	if (user) {
		res.send({
			status: 0,
			success: '已经注册',
			data: user
		})
	} else {
		const newAdmin = {
			user_name: "swag",
			password: 123123,
			id: 1,
			create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
			admin: "管理员",
			status: 0,
		}
		console.log(dtime().format('YYYY-MM-DD HH:mm:ss'))
		await AdminModel.create(newAdmin)
		res.send({
			status: 1,
			success: '注册管理员成功',
		})
	}

});
router.get('/findUser', async (req, res, next) => {

});
module.exports = router;
