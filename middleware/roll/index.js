const request = require("request"); //网络请求
const urlstr = require("./urlAddress");
const { next } = require("cheerio/lib/api/traversing");
const logger = require("../../logs/logs").logger;

class roll {
  // 获取图片
  getImgList = async (req, res, next) => {
    let url = urlstr("https://www.mxnzp.com/api/image/girl/list", {
      page: req.query.page,
    });
    request(url, async (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        let info = JSON.parse(body).data;
        let filterArr = [];
        for (let i = 0; i < info.length; i++) {
          if (filterArr.indexOf(info[i].imageUrl) == -1) {
            filterArr.push(info[i].imageUrl);
          }
        }
        res.send({
          result: 1,
          msg: "请求成功",
          data: filterArr,
        });
      }
    });
  };
  //每日新闻类型
  getNewType = async (req, res, next) => {
    let url = urlstr(" https://www.mxnzp.com/api/news/types/v2");
    request(url, async (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          result: 1,
          msg: "请求成功",
          data: JSON.parse(body).data,
        });
      }
    });
  };
  //获取指定新闻类型的新闻列表
  getNewList = async (req, res, next) => {
    let url = urlstr(" https://www.mxnzp.com/api/news/list/v2", {
      typeId: req.query.typeId,
      page: req.query.page,
    });
    request(url, async (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          result: 1,
          msg: "请求成功",
          data: JSON.parse(body),
        });
      }
    });
  };
  //根据新闻id获取新闻详情
  getNewDetails = async (req, res, next) => {
    let url = urlstr("  https://www.mxnzp.com/api/news/details/v2", {
      newsId: req.query.newsId,
    });
    request(url, async (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          result: 1,
          msg: "请求成功",
          data: JSON.parse(body),
        });
      }
    });
  };
  // 历史上的今天
  getToday = async (req, res, next) => {
    let url = urlstr("https://www.mxnzp.com/api/history/today", {
      type: 1,
    });
    request(url, async (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          result: 1,
          msg: "请求成功",
          data: JSON.parse(body),
        });
      }
    });
  };
  // 返回按钮
  rollSetting = async (req, res, next) => {
    let option = [
      { id: 1, name: "美女图片" },
      { id: 2, name: "新闻" },
      { id: 3, name: "历史上的今天" },
      { id: 4, name: "家政预约" },
    ];
    res.send({
      result: 1,
      msg: "成功",
      data: option,
    });
  };
}
module.exports = new roll();
