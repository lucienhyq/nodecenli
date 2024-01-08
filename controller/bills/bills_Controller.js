const bilsSchema = require("../../models/bills/newBils");
const Admin = require("../../models/admin/admin");
const getIdmethod = require('../../prototype/ids');
const bildsAccountSchema = require("../../models/bills/account")
class Bills {
  /**
   * 
   * @param {
   *  id 用户id
   * } req 
   * @param {*} res 
   * @param {*} next 
   */
  async add(req, res, next) {
    const item_id = await getIdmethod.getId('item_id');
    let reqBody = req.body;
    let uid;
    if (req.user) {
      uid = req.user.id
    }
    if(!reqBody){
      formatErrorMessage(res,'错误请求')
      return
    }
    // 获取登录的会员id
    let adminList = await Admin.findOne({ id: uid });
    // 再去查找这个会员是否有 记账记录
    //先查看是否有会员之前的记录 
    let findAccount = await bildsAccountSchema.findOne({ uid: adminList._id })
    console.log(findAccount, 'bildsAccountSchema.findOne')
    // 增加记录表
    await bilsSchema.create({
      id: item_id,
      type_us: reqBody.type_us,
      creatUid: adminList._id,
      amount: reqBody.amount,
      time: new Date(),
      note: reqBody.note
    }).then(async (res, err) => {
      console.log(res, 'bilsSchema.create 新增记账记录成功')
      const BilsAccountJson = {
        uid: adminList._id,
      }
      let postAmount = Number(reqBody.amount);
      if (!findAccount) {
        // 创建记录成功就给账号表输入变成数据
        if (reqBody.type_us == "expense") {
          console.log('这次变动类型是消费')
          BilsAccountJson.expensePrice = -postAmount;
          BilsAccountJson.totalMoney = -postAmount;
        } else {
          console.log('这次变动类型是收入')
          BilsAccountJson.incomePrice = postAmount;
          BilsAccountJson.totalMoney = postAmount;
        }
        bildsAccountSchema.create(BilsAccountJson);
        console.log('这是这个账号第一笔记账', BilsAccountJson)
      } else {
        console.log('这个账号已经记过账了,记账记录是这样的', findAccount, '更新原来的这个记录')
        const oldAccount = findAccount;
        if (reqBody.type_us == "expense") {
          console.log('这次变动类型是消费')
          oldAccount.expensePrice = (oldAccount.expensePrice) + (-postAmount);
          oldAccount.totalMoney = (oldAccount.totalMoney) + (-postAmount);
        } else {
          console.log('这次变动类型是收入')
          oldAccount.incomePrice = oldAccount.expensePrice + postAmount;
          oldAccount.totalMoney = oldAccount.totalMoney + postAmount;
        }
        await bildsAccountSchema.updateOne({ uid: adminList._id }, oldAccount)
      }
    })
    res.json({
      result: 200,
      msg: '成功',
      data: []
    })
  }
  async index(req, res, next) {
    console.log(req.user, 'ddddddd');
    let uid;
    if (req.user) {
      uid = req.user.id
    }
    let adminList = await Admin.findOne({ id: uid });
    let billsList;
    if (adminList && adminList._id) {
      billsList = await bildsAccountSchema.findOne({ uid: adminList._id })
        .select('-_id -__v')
        .populate('uid', '-_id user_name id')
    }
    res.json({
      result: 200,
      msg: '成功',
      data: billsList
    })
  }
}

module.exports = new Bills();
const formatErrorMessage = function (res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": String(message),
  });
}