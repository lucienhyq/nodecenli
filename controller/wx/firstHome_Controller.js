const courseModel = require('../../models/course/course');
const refereeListModel = require('../../models/refereeList/refereeList');
const acquirePost_Controller = require("../../controller/acquirePost");
const request = require('request')       //网络请求
const cheerio = require("cheerio");  //爬虫 扩展模块
const article_model = require('../../models/course/Article/Article')
const getIdmethod = require('../../prototype/ids');



const logger = require('../../logs/logs').logger;
const firstHome = async (req, res, next) => {
  let courseList = await courseModel.find({}).limit(20);
  let referee = await refereeListModel.find({}).limit(20);
  let news = await getNbaNews();

  // news = JSON.parse(news).data;
  let arr = [];
  if (news) {
    console.log(news)
    for (let index = 0; index < news.length; index++) {
      const element = news[index];
      let farr = filterObj(element, ["news_id", "title", "thumbnail_2x", "vid"])
      if (!arr.length) {
        arr[0] = farr;
      } else {
        arr = arr.concat(farr)
      }
      let len = await article_model.find({ news_id: farr.news_id });
      console.log(len,'len')
      if (len.length <= 0) {
        let jsonsa = {
          id: await getArticleId(),
          title: farr.title,
          poster: farr.thumbnail_2x,
          news_id: farr.news_id,
        }
        if (farr.vid) {
          jsonsa.vid = farr.vid;
          jsonsa.conten = '';
        }
        let articleDetail = await getArticleConten(farr);
        jsonsa.conten = articleDetail.cnt_html;
        jsonsa.videoSrc = articleDetail.videoSrc;
        console.log(jsonsa)
        article_model.create(jsonsa)
      }
    }
  }
  let json, bodyHtml;
  try {
    await hupuNba();
    json = await hupu();
    bodyHtml = await cheerioBody();
  } catch (error) {
    logger.info(error);
  }
  res.status(200).send({
    msg: "",
    data: {
      json: await article_model.find({}).sort({id:-1}).limit(15),
      course: courseList,
      referee,
      bodyHtml: bodyHtml
    },
    result: 1,
  })
}
module.exports = firstHome;

var hupuNba = function () {
  let url = 'https://nba.hupu.com/';
  let resultArr = [];
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body);
        $(".list-item a").each((iten, i) => {
          let json = {}
          json.title = $(i).text();
          json.link = $(i).attr('href');
          resultArr.push(json)
        })
        resolve(resultArr)
      }
    })
  })
}
var hupu = function () {
  let url = "https://www.hupu.com/";
  let resultArr = [];
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body);
        $(".list-item").each((iten, i) => {
          let json = {};
          json.title = $(i).find('.list-item-title').text();
          json.link = $(i).find('a,.list-item-title').attr('href');
          if ($(i).find('.list-img a img').attr("src")) {
            json.src = $(i).find('img').attr("src");
          }
          resultArr.push(json);
        })
        resolve(resultArr)
      }
    })
  })
}

cheerioBody = function () {
  let url = "https://bbs.hupu.com/58835780.html";
  let resultArr = {};
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body);
        $(".thread-content-detail").each((iten, i) => {
          if (iten == 0) {
            resultArr.imgsrc = $(i).find("img").attr("src");
            resultArr.conten = $(i).find('p').text();
          }
        })
        resolve(resultArr)
      }
    })
  })
}
var getNbaNews = function () {
  let url = "https://china.nba.cn/cms/v1/news/list?page_size=10&page_no=1";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body).data)
      }
    })
  })
}

var filterObj = function (obj, arr) {
  if (typeof (obj) !== "object" || !Array.isArray(arr)) {
    throw new Error("参数格式不正确")
  }
  const result = {}
  Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
    result[key] = obj[key]
  })
  return result
}

var getArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.getId('article_id');
    resolve(articleId)
  })
}

var getArticleConten = function (farr) {
  url = 'https://china.nba.cn/cms/v1/news/info?news_id=' + farr.news_id;
  let videoSrc = '';
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        if (farr.vid) {
          videoSrc = await getNBAvideo(farr);
        }
        let cnt_html = JSON.parse(body).data.cnt_html;
        if (cnt_html == '<P><!--VIDEO_0--></P>') {
          cnt_html = '';
        }
        resolve({
          cnt_html: cnt_html,
          videoSrc: videoSrc
        })
      }
    })
  })
}

var getNBAvideo = function (farr) {
  let url = 'https://china.nba.cn/cms/v1/video/playurl?vid=' + farr.vid + '&quality=shd';
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body).data.url)
      }
    })
  })
}