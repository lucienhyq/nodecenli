const dtime = require("time-formater");
const getIdmethod = require("../../prototype/ids");
const homemakingUser = require("../../models/homemaking/homemakingUser");
const admin = require("../../models/admin/admin");
const request = require("request"); //网络请求
const logger = require("../../logs/logs").logger;
const accessTokenJson = require("../../js/miniToken.json");
const fs = require("fs");
const orderModel = require("../../models/order/order");
var mongoose = require("mongoose");
class setting {
  //设置
  async getSetting(req) {
    try {
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
    } catch (error) {
      new throws(error);
    }
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
      formatErrorMessage(500, res, error);
    }
  }
  /**
   * 异步获取家政服务人员列表。
   * 此函数用于处理请求，获取家政服务人员的分页列表。它支持通过查询参数来筛选结果。
   *
   * @param {Object} req - 请求对象，包含查询和请求体参数。
   * @param {Object} res - 响应对象，用于发送响应。
   * @param {Function} next - 中间件函数，用于处理下一个中间件或结束请求。
   * @returns {Promise} 返回一个Promise，解析为发送给客户端的响应。
   */
  async homemakingList(req, res, next) {
    try {
      let datainfo;

      // 根据请求体中是否包含hmuid来决定查询特定用户还是所有用户的家政服务信息。
      if (req.body.hmuid) {
        datainfo = await homemakingUser
          .find({ hmuid: req.body.hmuid })
          .select("-_id -__v") // 选择性地返回文档字段，排除_id和__v字段。
          .populate("creatUid participants", "-_id user_name avatar mobile id"); // 引用关联文档，排除特定字段。
      } else {
        datainfo = await homemakingUser
          .find({})
          .select("-_id -__v")
          .populate("creatUid participants", "-_id user_name avatar mobile id");
      }

      // 将查询结果中每个文档的work字段从字符串转换为JSON对象。
      datainfo.map((item) => {
        item.work = JSON.parse(item.work);
      });

      // 记录查询结果到日志系统。
      logger.info(datainfo);

      // 发送处理后的查询结果给客户端。
      res.send({
        data: {
          data: datainfo,
          setting: await super.getSetting(req), // 同时获取并返回设置信息。
        },
        result: 1,
        msg: "成功",
      });
    } catch (error) {
      // 在查询过程中发生错误时，通过中间件函数格式化并返回错误信息。
      formatErrorMessage(500, res, error);
      console.log(error);
    }
  }
  /**
   * 异步添加家政服务信息。
   * 此函数用于处理添加家政服务的请求，它首先验证管理员信息和请求体中的服务名称，
   * 然后创建一个新的家政服务条目并将其保存到数据库中。
   *
   * @param {Object} req - 请求对象，包含添加服务的详细信息。
   * @param {Object} res - 响应对象，用于向客户端发送响应。
   * @param {Function} next - 中间件函数，用于处理下一个中间件或结束请求。
   * @throws {Error} 如果管理员未设置手机号或服务名称未提供，则抛出错误。
   */
  // 添加家政服务
  async addHomemaking(req, res, next) {
    try {
      // 获取请求体内容
      const cBody = req.body;
      // 验证当前操作的管理员是否存在并获取其信息
      const adminResult = await admin.findOne({ id: req.session.user.id });
      // 获取家政服务的唯一ID
      const homemaking_id = Number(await getIdmethod.getId("homemaking_id"));

      // 检查管理员是否已设置手机号
      if (!adminResult.mobile) {
        throw new Error("请先设置管理员手机号");
      }

      // 检查是否提供了服务名称
      if (!cBody.makingName) {
        throw new Error("请输入服务名称");
      }

      // 构建家政服务对象
      let json = {
        makingName: cBody.makingName, //姓名
        hmuid: homemaking_id, //服务id
        creatUid: adminResult._id, //创建人的_id
        img: cBody.img, //服务介绍图片
        mobile: adminResult.mobile, //手机号
        work: cBody.work,
        clientShow: cBody.clientShow == 1 ? true : false,
        takeOrder: cBody.takeOrder == 1 ? true : false,
      };
      // 检查并处理参与者数组
      const participants = Array.isArray(cBody.participants)
        ? cBody.participants
        : JSON.parse(cBody.participants);
      if (participants) {
        const participantsResult = await admin.find({
          id: { $in: participants },
        });
        // 将处理后的参与者数组添加到json对象中
        const resultArr = participantsResult.map((item) => {
          return item._id;
        });
        json.participants = resultArr;
      }

      // 将家政服务对象保存到数据库
      let makeAdd = await homemakingUser.create(json);

      // 向客户端发送成功响应
      res.send({
        result: 1,
        data: makeAdd,
        msg: "添加家政人员成功",
      });
    } catch (error) {
      // 处理请求过程中发生的任何错误
      formatErrorMessage(500, res, error);
    }
  }
  // 更新在职状态
  async updateWorkStatus(req, res, next) {
    try {
      if (!req.body.hmuid) {
        formatErrorMessage(200, res, "输入正确的家政职工id");
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
        formatErrorMessage(500, res, error);
      }
    } catch (error) {
      formatErrorMessage(500, res, error);
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
      formatErrorMessage(500, res, error);
      logger.error("error" + error);
    }
  }
  // 创建订单
  async homework_creatOrder(req, res, next) {
    try {
      // 订单id
    } catch (error) {
      formatErrorMessage(500, res, error);
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
      formatErrorMessage(500, res, error);
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
        formatErrorMessage(500, res, "请输入正确的订单id");
        return;
      }
      await orderModel
        .updateOne({ orderId: req.body.orderId }, { status: 1 })
        .exec((err, list) => {
          if (err) {
            formatErrorMessage(500, res, "失败");
            return;
          }
        });
      res.send({
        data: [],
        msg: "修改成功",
        result: 1,
      });
    } catch (error) {
      formatErrorMessage(500, res, error);
      logger.error("error" + error);
    }
  }
}

// 格式化错误信息

function formatErrorMessage(status = 500, res, errorMessage) {
  // 使用logger记录错误信息
  logger.error("Error occurred:", errorMessage);
  // 根据提供的错误信息，构造响应对象并发送给客户端
  res.status(status).send({
    data: "error",
    result: 0,
    msg: errorMessage.message || errorMessage || "服务器错误",
  });
}
module.exports = new homemaking();
