const AdminModel = require("../../models/admin/admin");
// 高德应用密钥
const appKey = "a366a7d52ab95072373fb1d972627dec";
const xlsx = require("node-xlsx");
const fs = require("fs");
const request = require("request"); //网络请求
class tool_weather {
  Weather_get = async (req, res, next) => {
    if (!req.query.city) {
      res.send({
        result: 1,
        msg: "请输入城市名称",
      });
      return;
    }
    let cityName = req.query.city;
    try {
      let workSheet = xlsx.parse(
        fs.readFileSync(`${__dirname}/AMap_adcode_citycode.xlsx`)
      );
      let list = workSheet[0].data;
      // let lis = list.filter((item) => item[0] == cityName);
      let lis = fuzzySearch(cityName, list);
      if (lis.length > 0) {
        let parameters = `?city=${lis[1]}&key=${appKey}`;
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
      filterMsg.push(item)
    }
  });
  return filterMsg[0]
}
