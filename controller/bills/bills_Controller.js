const bilsSchema = require("../../models/bills/newBils");
const Admin = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");
const bildsAccountSchema = require("../../models/bills/account");
class Bills {
  constructor() {
    this.billsTag = {
      0: "其他",
      1: "交通",
      2: "餐饮",
      3: "生活用品",
      4: "医疗",
      5: "话费",
      6: "美容",
      7: "娱乐",
      8: "烟酒",
      9: "旅游",
      10: "学习",
      11: "运动",
      12: "住房",
      13: "幼儿",
    };
  }
  /**
   *
   * @param {
   *  id 用户id
   * } req
   * @param {*} res
   * @param {*} next
   */
  async add(req, res, next) {
    const item_id = await getIdmethod.getId("item_id");
    let reqBody = req.body;
    console.log(reqBody, req.query, "reqqqqqqqqqqq");
    let uid;
    if (req.user) {
      uid = req.user.uid;
    }
    if (!reqBody.amount) {
      formatErrorMessage(res, "错误请求");
      return;
    }
    // 获取登录的会员id
    let adminList = await Admin.findOne({ id: uid });
    // 再去查找这个会员是否有 记账记录
    //先查看是否有会员之前的记录
    let findAccount = await bildsAccountSchema.findOne({ uid: adminList._id });
    // console.log(findAccount, 'bildsAccountSchema.findOne')
    // 增加记录表
    await bilsSchema
      .create({
        id: item_id,
        type_us: reqBody.type_us,
        creatUid: adminList._id,
        amount: reqBody.amount,
        time: new Date(),
        note: reqBody.note,
        noteType: reqBody.noteType,
      })
      .then(async (res, err) => {
        console.log(res, "bilsSchema.create 新增记账记录成功");
        const BilsAccountJson = {
          uid: adminList._id,
        };
        let postAmount = Number(reqBody.amount);
        if (!findAccount) {
          // 创建记录成功就给账号表输入变成数据
          if (reqBody.type_us == "expense") {
            console.log("这次变动类型是消费");
            BilsAccountJson.expensePrice = -postAmount;
            BilsAccountJson.totalMoney = -postAmount;
          } else {
            console.log("这次变动类型是收入");
            BilsAccountJson.incomePrice = postAmount;
            BilsAccountJson.totalMoney = postAmount;
          }
          bildsAccountSchema.create(BilsAccountJson);
          console.log("这是这个账号第一笔记账", BilsAccountJson);
        } else {
          console.log(
            "这个账号已经记过账了,记账记录是这样的",
            findAccount,
            "更新原来的这个记录"
          );
          const oldAccount = findAccount;
          if (reqBody.type_us == "expense") {
            console.log("这次变动类型是消费");
            oldAccount.expensePrice = oldAccount.expensePrice + -postAmount;
            oldAccount.totalMoney = oldAccount.totalMoney + -postAmount;
          } else {
            console.log("这次变动类型是收入");
            oldAccount.incomePrice = oldAccount.expensePrice + postAmount;
            oldAccount.totalMoney = oldAccount.totalMoney + postAmount;
          }
          await bildsAccountSchema.updateOne(
            { uid: adminList._id },
            oldAccount
          );
        }
      });
    res.status(200).json({
      result: 1,
      msg: "记账成功",
      data: [],
    });
  }
  // 账本首页数据
  async index(req, res, next) {
    let uid;
    if (req.user) {
      uid = req.user.uid;
    }
    let reqBody = req.body;
    let adminList = await Admin.findOne({ id: uid });
    let billsList;
    billsList = await bildsAccountSchema
      .findOne({ uid: adminList._id })
      .select("-_id -__v")
      .populate("uid", "-_id user_name id");
    // 新用户没有账号
    if (!billsList) {
      await bildsAccountSchema.create({
        uid: adminList._id,
      });
      billsList = await bildsAccountSchema
        .findOne({ uid: adminList._id })
        .select("-_id -__v")
        .populate("uid", "-_id user_name id");
    }
    let resultData = {};
    resultData.expensePrice = billsList.expensePrice;
    resultData.totalMoney = billsList.totalMoney;
    resultData.incomePrice = billsList.incomePrice;
    resultData.user = billsList.uid;
    let page = 1;
    if (reqBody.page) {
      page = Number(reqBody.page);
    }
    const total = 15;
    const skipNum = page == 1 ? 0 : (page - 1) * total;
    resultData.list = {};
    resultData.list.data = [];
    resultData.list.currentPage = page;
    resultData.list.lastPage = "";
    await bilsSchema.countDocuments({ creatUid: adminList._id }).then((res) => {
      resultData.list.lastPage = Math.ceil(res / 15);
    });
    await bilsSchema
      .find({ creatUid: adminList._id })
      .select("-_id")
      .sort({ id: -1 })
      .limit(total)
      .skip(skipNum)
      .lean()
      .then((res) => {
        res.forEach((ele) => {
          ele.noteType = this.billsTag[ele.noteType];
        });
        resultData.list.data = res;
      });

    res.send({
      result: 1,
      msg: "成功",
      data: resultData,
    });
  }
}

module.exports = new Bills();
const formatErrorMessage = function (res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: String(message),
  });
};
