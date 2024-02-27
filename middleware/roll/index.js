const request = require("request"); //网络请求
const urlstr = require("./urlAddress");
const { next } = require("cheerio/lib/api/traversing");

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
        res.send({
          result: 1,
          msg: "请求成功",
          data: JSON.parse(body),
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
          data: JSON.parse(body),
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
}
module.exports = new roll();
