const AdminModel = require("../../models/admin/admin");
// 高德应用密钥
const appKey = "a366a7d52ab95072373fb1d972627dec";
// const xlsx = require("node-xlsx");
const xlsx = require("xlsx");
const fs = require("fs");
const request = require("request"); //网络请求
class tool_weather {
  // 获取天气预报
  Weather_get = async (req, res, next) => {
    if (!req.query.city) {
      res.send({
        result: 1,
        msg: "请输入城市名称",
      });
      return;
    }
    try {
      let excelRcFileBuffer = fs.readFileSync(
        `${__dirname}/AMap_adcode_citycode.xlsx`
      );
      let workbook = xlsx.read(excelRcFileBuffer, { tyep: "buffer" });
      let sheetNames = workbook.SheetNames;
      let sheet1 = workbook.Sheets[sheetNames[0]];
      let json_ = xlsx.utils.sheet_to_json(sheet1);
      let list = json_;
      let lis = null;
      await list.forEach((ele, index) => {
        if (ele["中文名"] == req.query.city) {
          lis = list[index];
        }
      });
      if (lis) {
        let parameters = `?city=${encodeURI(lis["中文名"])}&key=${appKey}`;
        let url = `https://restapi.amap.com/v3/weather/weatherInfo${parameters}`;
        request(url, async (err, response, body) => {
          if (err) {
            console.log(err);
          } else {
            res.send({
              result: 1,
              msg: "请求成功",
              data: JSON.parse(body).lives,
            });
          }
        });
      } else {
        res.send({
          result: 0,
          msg: "没有该城市",
        });
      }
    } catch (error) {
      res.send({
        result: 0,
        msg: error,
      });
      console.log(error);
    }
  };
  // 更新key
  updateAppKey = async (req, res, next) => {
    // const updateResult =  await AdminModel.updateMany({}, { $set: { weatherKey: '' } });
    let user = await AdminModel.findOne({ id: req.user.id });
    if (!user.weatherKey) {
      await AdminModel.updateMany({}, { $set: { weatherKey: "" } });
    }
    user.weatherKey = appKey;
    res.send({
      result: 1,
      msg: "设置成功",
      data: {},
    });
  };
}

module.exports = new tool_weather();

function fuzzySearch(queryString, searchArr) {
  let queryStringArr = queryString.split("");
  let str = "(.*?)";
  let filterMsg = [];
  let regStr = str + queryStringArr.join(str) + str;
  let reg = RegExp(regStr, "i"); // 以mh为例生成的正则表达式为/(.*?)m(.*?)h(.*?)/i
  searchArr.map((item) => {
    if (reg.test(item[0])) {
      filterMsg.push(item);
    }
  });
  return filterMsg[0];
}
