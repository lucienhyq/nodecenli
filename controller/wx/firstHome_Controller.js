// const courseModel = require("../../models/course/course");
// const refereeListModel = require("../../models/refereeList/refereeList");
// const acquirePost_Controller = require("../../controller/acquirePost");
const request = require("request"); //网络请求
// const cheerio = require("cheerio"); //爬虫 扩展模块
const article_model = require("../../models/course/Article/Article");
const like_model = require("../../models/course/Article/like");
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

const getNavList = function () {
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
const getNbaNews = function (req) {
  let time = Date.parse(new Date()) / 1000;
  let url = `https://api.nba.cn/cms/v2/web/column/modules/list?app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&channel=NBA&device_id=40baf4718eae0144157f77ff781dc984&install_id=1536133115&network=N%2FA&os_type=3&os_version=1.0.0&page_no=1&page_size=20&page_type=2&sign=sign_v2&sign2=87272D9C122EDAFBE75CF4E80AD374FC9E245A6E848E9CE4379C502CDFC8A53F&t=${time}`;
  console.log(url)
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

const filterObj = function (obj, arr) {
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
const article = require("../../models/course/Article/Article");
const Admin = require("../../models/admin/admin");
const { urlencoded } = require("body-parser");
// 定义 resolve 函数
const resolvePath = (dir) => {
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
const downfile_img = async (url) => {
  // return new Promise((resolve, reject) => {
  let imgUrl = url;
  let imgName = generateFileName(imgUrl);
  let imgPath = path.join(resolvePath("uploads/article"), imgName);
  // 确保目录存在
  const uploadDir = resolvePath("uploads/article");
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

// 获取文章id
const getArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.getId("article_id");
    resolve(articleId);
  });
};
// 重置文章id
const setArticleId = function () {
  return new Promise(async (resolve, reject) => {
    let articleId = await getIdmethod.setId("article_id");
    resolve(articleId);
  });
};

// 获取nba文章详情
const getArticleConten = function (farr) {
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
// 获取文章里面的视频链接
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

class firstHome_Controller {
  // 首页
  firstHome = async (req, res, next) => {
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
    console.log("req.query.page", req.query);
    let findList = await article_model.aggregate([
      { $group: { _id: "$news_id", document: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$document" } },
      { $sort: { id: -1 } },
      { $skip: req.query.page ? req.query.page * 10 : 0 },
      { $limit: 10 },
    ]);
    res.status(200).send({
      msg: "",
      data: {
        list: findList,
        navList: navList,
        total: await article_model.countDocuments(),
      },
      result: 1,
    });
  };
  // 点赞
  Like = async (req, res, next) => {
    let { id } = req.query;
    let articleinfo = await article_model.findOne({ id: id }).exec();
    let userinfo = await Admin.findOne({ id: req.user.uid });
    let like = new like_model({
      article: articleinfo._id,
      user: userinfo._id,
    });
    like.save();
    articleinfo.likes.push(like._id);
    await articleinfo.save();
    res.status(200).send({
      data: "",
      result: 1,
      msg: "",
    });
  };
  getLike = async (req, res, next) => {
    try {
      let likeArr = await article_model
        .findOne({ _id: "66fa469879c0d911241b37ab" })
        .populate({
          path: "likes",
          select: "user article", // 选择需要填充的字段
          populate: [
            {
              path: "user",
              select: "id user_name -_id",
            },
          ],
        });
      res.status(200).send({
        data: likeArr,
        result: 1,
        msg: "",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        data: null,
        result: 0,
        msg: "Internal server error",
      });
    }
  };
  // 获取新闻列表
  getNewsList = async (req, res, next) => {
    let news_id = req.query.news_id;
    let time = Date.parse(new Date()) / 1000;
    let article_len = await article_model.findOne({ news_id: news_id }).count();
    let url = `https://api.nba.cn/cms/v2/news/info?app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&channel=NBA&device_id=82e78b39c4dbd0000dbe4d53275d948a&install_id=1536133115&network=N%2FA&news_id=${news_id}&os_type=3&os_version=1.0.0&sign=sign_v2&sign2=6AADE1DA1D373731DCEA8808CAFA2BDC36FCC61806AF917AE91F8A510BDE70A0&t=${time}`;
    try {
      await request(url, async (err, response, body) => {
        if (err) {
          logger.error(error);
          res.send({
            data: error,
            result: 0,
            msg: "fail",
          });
        } else {
          let bodyInfo = JSON.parse(body).data;
          logger.info("dddddddddddddd", bodyInfo.cnt_attr);
          if (article_len == 1) {
            await article_model
              .updateOne(
                { news_id: news_id },
                {
                  $inc: { pageviews: 1 }, // 递增 pageviews
                  $set: {
                    source: bodyInfo.source, // 设置 source 字段
                    updated_time: bodyInfo.updated_time
                      ? bodyInfo.updated_time
                      : bodyInfo.publish_time, // 设置 updated_time 字段
                    cnt_attr: bodyInfo.cnt_attr, // 设置 cnt_attr 字段
                  },
                }
              )
              .then((res) => {
                logger.info(res, "更新成功");
              })
              .catch((err) => {
                logger.error(err);
              });
          } else {
            let json = {
              id: await getArticleId(),
              title: bodyInfo.title,
              poster: await downfile_img(bodyInfo.thumbnail_2x),
              news_id: bodyInfo.news_id,
              source: bodyInfo.source,
              conten: bodyInfo.cnt_html,
              publish_time: bodyInfo.publish_time,
              updated_time: bodyInfo.updated_time,
              cnt_attr: bodyInfo.cnt_attr,
              pageviews: 1,
            };
            await article_model.create(json);
          }
          let Article = await article_model
            .findOne({ news_id: news_id })
            .populate({
              path: "likes",
              select: "user article", // 选择需要填充的字段
              populate: [
                {
                  path: "user",
                  select: "id user_name -_id",
                },
                {
                  path: "article",
                  select: "id title -_id",
                },
              ],
            });
          res.send({
            data: Article,
            result: 1,
            msg: "成功",
          });
        }
      });
    } catch (error) {
      logger.error(error);
      res.send({
        data: error,
        result: 0,
        msg: "fail",
      });
    }
  };
  // 获取球星资料
  getStartDetail = async (req, res, next) => {
    let time = Date.parse(new Date()) / 1000;
    let fullName = req.query.fullName ? req.query.fullName : "";
    let url = `https://api.nba.cn/sib/v2/players/list?app_key=tiKB2tNdncnZFPOi&app_version=1.1.0&channel=NBA&device_id=82e78b39c4dbd0000dbe4d53275d948a&install_id=4260924495&network=N%2FA&os_type=3&os_version=1.0.0&page_no=1&page_size=100&retireStat=A&sign=sign_v2&sign2=5D1FBF927CF213A9D42A7923C4751E2838F4657682B3EEE764060F73DAAC64A0&t=${time}&fullName=${encodeURIComponent(
      fullName
    )}`;
    try {
      await request(url, async (err, response, body) => {
        if (err) {
          logger.error(err);
          res.send({
            data: err,
            result: 0,
            msg: "fail",
          });
        } else {
          res.status(200).send({
            msg: "success",
            result: 1,
            data: JSON.parse(body),
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        result: 0,
        msg: "Internal server error",
      });
    }
  };
}

module.exports = new firstHome_Controller();
