const courseModel = require("../../models/course/course");
const refereeListModel = require("../../models/refereeList/refereeList");
const acquirePost_Controller = require("../../controller/acquirePost");
const request = require("request"); //网络请求
const cheerio = require("cheerio"); //爬虫 扩展模块
const article_model = require("../../models/course/Article/Article");
const getIdmethod = require("../../prototype/ids");

const logger = require("../../logs/logs").logger;
const firstHome = async (req, res, next) => {
  let news = await getNbaNews(req);
  let arr = [];
  if (news) {
    // await article_model.deleteMany({});
    // await setArticleId();
    for (let index = 0; index < news.length; index++) {
      const element = news[index];
      let farr = filterObj(element, [
        "news_id",
        "title",
        "thumbnail_2x",
        "vid",
      ]);
      if (!arr.length) {
        arr[0] = farr;
      } else {
        arr = arr.concat(farr);
      }
      let len = await article_model.find({ news_id: farr.news_id });
      if (len.length <= 0) {
        let jsonsa = {
          id: await getArticleId(),
          title: farr.title,
          poster: farr.thumbnail_2x,
          news_id: farr.news_id,
        };
        if (farr.vid) {
          jsonsa.vid = farr.vid;
          jsonsa.conten = "";
        }
        let articleDetail = await getArticleConten(farr);
        // 获取新闻详情
        jsonsa.conten = articleDetail.cnt_html;
        // 获取视频资源链接
        jsonsa.videoSrc = articleDetail.videoSrc;
        // console.log(jsonsa);
        article_model.create(jsonsa);
      }
    }
  }
  try {
  } catch (error) {
    logger.info(error);
  }
  res.status(200).send({
    msg: "",
    data: {
      json: await article_model.find({}),
    },
    result: 1,
  });
};
module.exports = firstHome;

var getNbaNews = function (req) {
  let url =
    "https://china.nba.cn/cms/v1/news/list?column_id=57&page_size=24&page_no=1";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body).data);
      }
    });
  });
};

var filterObj = function (obj, arr) {
  if (typeof obj !== "object" || !Array.isArray(arr)) {
    throw new Error("参数格式不正确");
  }
  const result = {};
  Object.keys(obj)
    .filter((key) => arr.includes(key))
    .forEach((key) => {
      result[key] = obj[key];
    });
  return result;
};

var getArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.getId("article_id");
    logger.info("firstHome ===> getArticleId", articleId);
    resolve(articleId);
  });
};
var setArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.setId("article_id");
    resolve(articleId);
  });
};

var getArticleConten = function (farr) {
  url = "https://china.nba.cn/cms/v1/news/info?news_id=" + farr.news_id;
  let videoSrc = "";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (farr.vid) {
          videoSrc = await getNBAvideo(farr);
        }
        logger.info(body);
        let cnt_html;
        if (body) {
          cnt_html = JSON.parse(body).data.cnt_html;
        }
        if (cnt_html == "<P><!--VIDEO_0--></P>") {
          cnt_html = "";
        }
        resolve({
          cnt_html: cnt_html,
          videoSrc: videoSrc,
        });
      }
    });
  });
};

var getNBAvideo = function (farr) {
  let url =
    "https://china.nba.cn/cms/v1/video/playurl?vid=" +
    farr.vid +
    "&quality=shd";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body).data.url);
      }
    });
  });
};
