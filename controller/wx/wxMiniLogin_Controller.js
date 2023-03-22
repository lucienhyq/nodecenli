const request = require("request"); //http请求模块
const appid = "wxe6d74c44b857ba7b";
const secret = "00c2105ad289a858de30209a10b73295";
const AdminModel = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");
const dtime = require("time-formater");

const wxlogin = async (req, res, next) => {
  let urlstr = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code`;
  if (!req.query.code) {
    // 测试用
    req.session.user = {
      userName: '测试',
      uid: 12,
    };
    res.status(200).send({
      msg: "测试",
      data: [],
      session: req.session.user,
    });
  }
  urlstr += `&js_code=${req.query.code}`;
  let fields;
  // 先通过小程序会员查AdminModel 是否有小程序 openid
  if(req.query.uid || req.body.uid){
    
  }
  request(urlstr, async (error, response, body) => {
    let bodyData = JSON.parse(body);
    let userList;
    if (bodyData.openid) {
      let checkOpenid = await AdminModel.findOne({ openid: bodyData.openid });
      // 如果用户表里面有openid 就返回已注册的用户信息给前端
      if (checkOpenid) {
        userList = checkOpenid;
        req.session.user = {
          userName: userList.user_name,
          uid: admin_id,
        };
        res.status(200).send({
          msg: "登录成功",
          data: userList,
          session: req.session.user,
        });
      } else {
        if (!req.query.info) {
          //有openid而且没有用户信息就返回result :0,或者msg请登录 ，让用户跳转取授权登录页面
          res.status(200).send({
            msg: "请登录",
            data: {},
            result: 0,
          });
        }
        fields = JSON.parse(req.query.info);
        const admin_id = await getIdmethod.getId("admin_id");
        // 有openid且有用户信息就在用户表新建一个并且返回给前端
        const newAdmin = {
          user_name: fields.nickName,
          password: fields.password ? fields.password : "",
          id: admin_id,
          create_time: dtime().format("YYYY-MM-DD HH:mm:ss"),
          admin: "mini",
          status: 3,
          avatar: fields.image
            ? fields.image
            : "https://lucien.freehk.svipss.top/uploads/1c1aac37ba7728703da738ddc1b3e701.jpg",
        };
        newAdmin.session_key = bodyData.session_key;
        newAdmin.openid = bodyData.openid;
        userList = await AdminModel.create(newAdmin);
        req.session.user = {
          userName: fields.user_name,
          uid: admin_id,
        };
        res.status(200).send({
          msg: "登录成功",
          data: userList,
          session: req.session.user,
        });
      }
    }
  });
};
module.exports = wxlogin;
