const dtime = require("time-formater");
const getIdmethod = require("../../prototype/ids");
const homemakingUser = require("../../models/homemaking/homemakingUser");
const admin = require("../../models/admin/admin");
const request = require("request"); //网络请求
const logger = require("../../logs/logs").logger;
const accessTokenJson = require("../../js/miniToken.json");
const fs = require("fs");
const orderModel = require("../../models/order/order");
class setting {
  //设置
  async getSetting(req) {
    let obj = {
      city: "广州市",
      thumb: ["http://localhost:3000/uploads/bg1.jpg"],
      txt: "暂只支持广州市内区域",
      admin: false,
    };
    if (req.user) {
      let list = await admin.findOne({ id: req.user.uid });
      // 管理员账号
      console.log(req.user, list, "wwwwwwwwwww");
      obj.admin = list.admin == 1 ? true : false;
      let isHomeMaking = await homemakingUser
        .findOne({ creatUid: req.user._id })
        .populate("creatUid", "_id id");
      obj.hmuid = isHomeMaking ? isHomeMaking.hmuid : 0;
    }
    return obj;
  }
}
class homemaking extends setting {
  constructor() {
    super();
  }
  /**
   *
   * @param {uid,user_name} req
   * @param {*} res
   * @param {*} next
   */
  // 查找会员id
  async findAdmin(req, res, next) {
    try {
      let json;
      let keyword = Number(req.body.keyword);
      if (!keyword) {
        json = {
          user_name: new RegExp(req.body.keyword, "i"),
        };
      } else {
        json = {
          id: keyword,
        };
      }
      admin
        .find(json)
        .select("-__v -createdAt -openid -session_key -updatedAt -password")
        .exec((err, list) => {
          if (err) {
            logger.info("homemakingList::::::err", err);
          }
          res.send({
            data: list,
            result: 1,
            msg: "成功",
          });
        });
    } catch (error) {
      formatErrorMessage(res, error);
    }
  }
  // 获取列表
  async homemakingList(req, res, next) {
    try {
      if (req.body.hmuid) {
        homemakingUser
          .findOne({ hmuid: req.body.hmuid })
          .select("-_id -__v")
          .populate("creatUid bindUid", "-_id user_name avatar mobile id")
          .exec((err, list) => {
            if (err) {
              logger.info("homemakingList::::::err", err);
            }
            if (!list) {
              formatErrorMessage(res, "error");
              return;
            }
            res.send({
              data: list,
              result: 1,
              msg: "成功",
            });
          });
      } else {
        let datainfo = await homemakingUser
          .find({})
          .populate("creatUid", "_id id");
        res.send({
          data: {
            data: datainfo,
            setting: await super.getSetting(req),
          },
          result: 1,
          msg: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 添加家政
  async addHomemaking(req, res, next) {
    try {
      let cBody = req.body;
      let { realname, avatar, mobile, takeOrder, price } = cBody;
      const adminResult = await admin.findOne({ id: req.session.user.id });
      let findOneUser = await homemakingUser
        .find({ creatUid: adminResult._id })
        .populate("creatUid");
      if (findOneUser.length > 0) {
        let msg = "";
        if (!findOneUser[0].status) {
          msg = "已经申请家政员工，等待审核通过!";
        } else {
          msg = "已经是家政员工";
        }
        res.send({
          result: 0,
          data: [],
          msg: msg,
        });
        return;
      }
      if (!realname) {
        formatErrorMessage(200, res, "员工名称不能为空");
        return;
      }
      if (!mobile) {
        formatErrorMessage(200, res, "员工手机不能为空");
        return;
      }
      if (!price) {
        formatErrorMessage(200, res, "请填写工时价格");
        return;
      }
      if (!avatar) {
        formatErrorMessage(200, res, "请选择上传头像");
        return;
      }
      const homemaking_id = Number(await getIdmethod.getId("homemaking_id"));
      let newAdmin = {
        realname: realname,
        hmuid: homemaking_id,
        create_time: dtime().format("YYYY-MM-DD HH:mm:ss"),
        avatar: avatar ? avatar : "photo-mr.jpg",
        mobile: mobile,
        takeOrder: takeOrder ? takeOrder : false,
        price: price,
      };
      try {
        if (adminResult) {
          newAdmin.creatUid = adminResult._id;
        } else {
          formatErrorMessage(200, res, "请登录");
          return;
        }
        let userList = await homemakingUser.create(newAdmin);
        res.send({
          result: 1,
          data: userList,
          msg: "添加家政人员成功",
        });
      } catch (error) {
        console.log(error, "其他错误");
        logger.info("MongoServerError", error);
        // 处理其他错误
      }
    } catch (error) {
      formatErrorMessage(res, error);
    }
  }
  // 更新在职状态
  async updateWorkStatus(req, res, next) {
    try {
      if (!req.body.hmuid) {
        formatErrorMessage(res, "输入正确的家政职工id");
      }
      let json = {
        hmuid: req.body.hmuid,
      };
      if (req.body.realname) {
        json.realname = req.body.realname;
      }
      if (req.body.avatar) {
        json.avatar = req.body.avatar;
      }
      if (req.body.mobile) {
        json.mobile = req.body.mobile;
      }
      if (req.body.workTime) {
        json.workTime = req.body.workTime;
      }
      if (req.body.clientShow) {
        json.clientShow = req.body.clientShow;
      }
      if (req.body.bindUid) {
        json.bindUid = req.body.bindUid;
      }
      console.log(json);
      try {
        await homemakingUser.updateOne({ hmuid: req.body.hmuid }, json);
        res.send({
          result: 1,
          msg: "修改成功",
        });
      } catch (error) {
        formatErrorMessage(res, error);
      }
    } catch (error) {
      formatErrorMessage(res, error);
    }
  }
  // 家政服务删除
  async homework_delete(req, res, next) {
    try {
      let humid = req.query.hmuid;
      const result = await homemakingUser.deleteOne({ id: humid });
      if (result.deletedCount > 0) {
        logger.info(result, "删除成功");
        res.send({
          result: 1,
          msg: "删除成功",
        });
      } else {
        logger.info(result, "删除失败");
        res.send({
          result: 0,
          msg: "删除失败",
        });
      }
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error("error" + error);
    }
  }
  // 创建订单
  async homework_creatOrder(req, res, next) {
    try {
      // 订单id
      
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error("error" + error);
    }
  }
  /**
   * 根据下单用户生成微信小程序码
   * 家政人员到场扫码确认到达
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async homeMakingCode(req, res, next) {
    try {
      let urlstr = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessTokenJson.access_token}`;
      let option = {
        url: urlstr,
        method: "POST",
        json: true,
        encoding: null,
        body: {
          page: "pages/index/index",
          scene: "orderId=" + req.body.orderId,
          check_path: true,
          env_version: "develop",
        },
      };
      let codePath = `uploads/wxMinPCode/card_id${req.body.orderId}.png`;
      let ispath = req.protocol + "://" + req.get("host");
      await fs.mkdir("uploads/wxMinPCode", (err) => {
        if (err) {
          console.log("文件夹已创建", err);
          return;
        }
      });

      await request(option, async (error, response, body) => {
        console.log(body);
        await fs.writeFile(codePath, body, (err) => {
          if (err) {
            logger.error("error" + err);
            return;
          }
          logger.info(`生成成功${ispath}${codePath}`);
          res.send({
            result: 1,
            data: `${ispath}${codePath}`,
            msg: "success",
          });
        });
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error("error" + error);
    }
  }
  /**
   * 签到
   * @param {orderId} req
   * @param {*} res
   * @param {*} next
   */
  async homeMakingReachSign(req, res, next) {
    try {
      console.log(req.session.user);
      let user = req.session.user;
      if (!req.body.orderId) {
        formatErrorMessage(res, "请输入正确的订单id");
        return;
      }
      await orderModel
        .updateOne({ orderId: req.body.orderId }, { status: 1 })
        .exec((err, list) => {
          if (err) {
            formatErrorMessage(res, "失败");
            return;
          }
        });
      res.send({
        data: [],
        msg: "修改成功",
        result: 1,
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error("error" + error);
    }
  }
}

// 格式化错误信息

function formatErrorMessage(status = 500, res, message) {
  logger.error("error:", message);
  res.status(status).send({
    data: "error",
    result: 0,
    msg: message || "",
  });
}
module.exports = new homemaking();