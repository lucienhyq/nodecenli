// const courseModel = require("../../models/course/course");
// const refereeListModel = require("../../models/refereeList/refereeList");
// const acquirePost_Controller = require("../../controller/acquirePost");
const request = require("request"); //网络请求
// const cheerio = require("cheerio"); //爬虫 扩展模块
const article_model = require("../../models/course/Article/Article");
const getIdmethod = require("../../prototype/ids");
const cron = require("node-cron");
const fs = require("fs");
const logger = require("../../logs/logs").logger;
const task = async () => {
  cron.schedule("59 23 * * *", async () => {
    console.log("每晚凌晨23点59分运行清理nba爬虫文章");
    logger.info("每晚凌晨23点59分运行清理nba爬虫文章");
    article_model.countDocuments(async (err, count) => {
      if (count > 0) {
        // 清除全部文章
        // await article_model.deleteMany({});
        // 重置文章id
        // await setArticleId();
        await firstHome();
      }
    });
  });
};
// var record = 0;
const firstHome = async (req, res, next) => {
  let navList;
  try {
    let news = await getNbaNews(req);
    navList = await getNavList();
    await task();
    let arr = news[0].contents;
    let jsonsa;
    if (arr) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index].article;
        let farr = filterObj(element, [
          "news_id",
          "title",
          "thumbnail_2x",
          "vid",
        ]);
        // 查找当前文章是否存在数据库中
        let articles = await article_model.find({ news_id: farr.news_id });
        if (articles.length === 0) {
          jsonsa = {
            id: await getArticleId(),
            title: farr.title,
            poster: "",
            news_id: farr.news_id,
          };
          logger.info(jsonsa);
          if (farr.vid) {
            jsonsa.vid = farr.vid;
            jsonsa.conten = "";
          }
          jsonsa.poster = await downfile_img(farr.thumbnail_2x);
          let articleDetail = await getArticleConten(jsonsa);
          // 获取新闻详情
          jsonsa.conten = articleDetail.cnt_html;
          // 获取视频资源链接
          jsonsa.videoSrc = articleDetail.videoSrc;
          article_model.create(jsonsa);
        }
      }
    }
  } catch (error) {
    console.log("q:::::::::", error);
    logger.error(error);
  }
  let findList = await article_model.aggregate([
    { $group: { _id: "$news_id", document: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$document" } },
    { $sort: { id: -1 } },
  ]);
  res.status(200).send({
    msg: "",
    data: {
      list: findList,
      navList: navList,
    },
    result: 1,
  });
};
module.exports = firstHome;

var getNavList = function () {
  let time = Date.parse(new Date()) / 1000;
  let url = `https://api.nba.cn/cms/v1/news/config?affiliation=1&app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&category=news_rotation&channel=NBA&device_id=40baf4718eae0144157f77ff781dc984&install_id=1536133115&network=N%2FA&os_type=3&os_version=1.0.0&sign=sign_v2&sign2=87272D9C122EDAFBE75CF4E80AD374FC9E245A6E848E9CE4379C502CDFC8A53F&t=${time}`;
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body).data.news_rotation);
      }
    });
  });
};
var getNbaNews = function (req) {
  let time = Date.parse(new Date()) / 1000;
  let url = `https://api.nba.cn/cms/v2/web/column/modules/list?app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&channel=NBA&device_id=40baf4718eae0144157f77ff781dc984&install_id=1536133115&network=N%2FA&os_type=3&os_version=1.0.0&page_no=1&page_size=20&page_type=2&sign=sign_v2&sign2=87272D9C122EDAFBE75CF4E80AD374FC9E245A6E848E9CE4379C502CDFC8A53F&t=${time}`;
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
const path = require("path"); //
const { Promise } = require("mongoose");
// 定义 resolve 函数
const resolve = (dir) => {
  // 获取当前工作目录的上级目录
  const rootDir = path.resolve(__dirname, "../..");
  return path.resolve(rootDir, dir);
};
const generateFileName = function (url) {
  const timestamp = Date.now();
  const extensionMatch = url.match(/\.([^.]+)(\?.*)?$/);
  const extension = extensionMatch ? extensionMatch[1] : "";
  return `${timestamp}.${extension}`;
};
require("dotenv").config();
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || "http://yourserver.com";

// 下载图片的函数
var downfile_img = async (url) => {
  // return new Promise((resolve, reject) => {
  let imgUrl = url;
  let imgName = generateFileName(imgUrl);
  let imgPath = path.join(resolve("uploads/article"), imgName);
  // 确保目录存在
  const uploadDir = resolve("uploads/article");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return new Promise((resolve, reject) => {
    request(imgUrl)
      .pipe(fs.createWriteStream(imgPath))
      .on("close", function (info) {
        const fullPath = `${SERVER_DOMAIN}/uploads/article/${imgName}`;
        resolve(fullPath);
      })
      .on("error", function (err) {
        reject(err);
        logger.err(err, "下载nba图片失败");
      });
  });
};

var getArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.getId("article_id");
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
  let time = Date.parse(new Date()) / 1000;
  let url = `https://api.nba.cn/cms/v2/news/info?app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&channel=NBA&device_id=82e78b39c4dbd0000dbe4d53275d948a&install_id=1536133115&network=N%2FA&news_id=${farr.news_id}&os_type=3&os_version=1.0.0&sign=sign_v2&sign2=6AADE1DA1D373731DCEA8808CAFA2BDC36FCC61806AF917AE91F8A510BDE70A0&t=${time}`;
  let videoSrc = "";
  return new Promise((resolve, reject) => {
    request(url, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (farr.vid) {
          videoSrc = await getNBAvideo(farr);
        }
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
    "https://api.nba.cn/cms/v1/video/playurl?vid=" + farr.vid + "&quality=shd";
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
