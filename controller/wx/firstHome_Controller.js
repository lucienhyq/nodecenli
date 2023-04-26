const courseModel = require('../../models/course/course');
const refereeListModel = require('../../models/refereeList/refereeList');
const acquirePost_Controller = require("../../controller/acquirePost");
const request = require('request')       //网络请求
const cheerio = require("cheerio");  //爬虫 扩展模块




const logger = require('../../logs/logs').logger;
const firstHome = async (req, res, next) => {
  let courseList = await courseModel.find({}).limit(20);
  let referee = await refereeListModel.find({}).limit(20);
  let news = await getNbaNews();
  
  news = JSON.parse(news).data;
  let arr = [];
  if (news) {
    news.forEach((element, ind) => {
      let farr = filterObj(element, ["news_id", "title", "thumbnail_2x","vid"])
      // https://china.nba.cn/cms/v1/video/playurl?vid=5s6FfuEs6nm&quality=shd 有vid的视频请求地址
      if (!arr.length) {
        arr[0] = farr;
      } else {
        arr = arr.concat(farr)
      }
    });
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
      course: courseList,
      referee,
      json: arr,
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
  let url = "https://china.nba.cn/cms/v1/news/list?page_size=5&page_no=1";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
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