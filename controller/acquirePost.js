const request = require('request')       //网络请求
const cheerio = require("cheerio");  //爬虫 扩展模块
var fs = require("fs");
const logger = require('../logs/logs').logger;



const acquirePost = async (req, res, next) => {
  try {
    if (!req.body.news) {
      const url = 'https://news.baidu.com/';
      let resultArr = [];
      request(url, async (err, response, body) => {
        const $ = cheerio.load(body);
        await $("#pane-news li a").each((iten, i) => {
          let json = {}
          json.title = $(i).text();
          json.link = $(i).attr('href');
          resultArr.push(json)
        })
        res.send({
          result: 1,

          msg: '',
        })
      })
    } else {
      if (req.body.news == 2) {
        let per_page = req.body.per_page ? req.body.per_page : '30';
        let page = req.body.page ? req.body.page : '1'
        const url = `https://unsplash.com/napi/photos?per_page=${per_page}&page=${page}`;
        let resultArr = [];
        request({
          url: url,
          method: "GET",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: ""
        }, async (err, response, body) => {
          resultArr = JSON.stringify(body[0]);
          res.send({
            result: 1,
            data: {
              page,
              per_page,
              list: body,
            },
            msg: '',
          })
        })
        return
      }
      const url = 'https://nba.hupu.com/';
      let resultArr = [];
      request(url, async (err, response, body) => {
        const $ = cheerio.load(body);
        await $(".list-item a").each((iten, i) => {
          let json = {}
          json.title = $(i).text();
          json.link = $(i).attr('href');
          resultArr.push(json)
        })
        res.send({
          result: 1,
          data: resultArr,
          msg: '',
        })
      })
    }
  } catch (error) {
    logger.info('error' + error);
    next(error);
  }
}
module.exports = acquirePost;