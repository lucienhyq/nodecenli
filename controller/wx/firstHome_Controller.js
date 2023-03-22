const courseModel = require('../../models/course/course');
const refereeListModel = require('../../models/refereeList/refereeList');
const acquirePost_Controller = require("../../controller/acquirePost");
const request = require('request')       //网络请求
const cheerio = require("cheerio");  //爬虫 扩展模块



const logger = require('../../logs/logs').logger;

const firstHome = async (req, res, next) => {
  let courseList = await courseModel.find({}).limit(20);
  let referee = await refereeListModel.find({}).limit(20);
  let json,bodyHtml;
  try {
    await hupuNba();
    json = await hupu();
    bodyHtml = await cheerioBody();
  } catch (error) {
    logger.info(error);
  }
  res.status(200).json({
    msg: "",
    data: {
      course: courseList,
      referee,
      json,
      bodyHtml:bodyHtml
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

cheerioBody = function(){
  let url = "https://bbs.hupu.com/58835780.html";
  let resultArr = {};
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        const $ = cheerio.load(body);
        $(".thread-content-detail").each((iten, i) => {
          if(iten == 0){
            resultArr.imgsrc = $(i).find("img").attr("src");
            resultArr.conten = $(i).find('p').text();
          }
        })
        resolve(resultArr)
      }
    })
  })
}