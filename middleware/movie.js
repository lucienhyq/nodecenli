const Movie = require("../models/btlVideo/movie");
const request = require("request");
const cheerio = require("cheerio"); // 用于解析 HTML
const { logger } = require("../logs/logs");

class movieController {
  static newOptions = {
    timeout: 10000, // 设置超时时间为7秒
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0",
    },
  };

  static fetchWithCookie = function (url, options) {
    return new Promise((resolve, reject) => {
      request(options, async (err, response, body) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }

        // 检查是否返回 HTML
        if (
          response.headers["content-type"] &&
          response.headers["content-type"].includes("text/html")
        ) {
          // 提取设置的 Cookie
          const $ = cheerio.load(body);
          const scriptContent = $("script").text();
          const cookieMatch = scriptContent.match(
            /document\.cookie\s*=\s*["']([^"']+)["']/
          );

          if (cookieMatch && cookieMatch[1]) {
            const cookie = cookieMatch[1];

            // 更新 movieController.newOptions 的 headers
            movieController.newOptions.headers.Cookie = cookie;

            // 使用提取到的 Cookie 重新发起请求
            const newOptions = {
              ...movieController.newOptions,
              url: options.url,
            };

            request(newOptions, (newErr, newResponse, newBody) => {
              if (newErr) {
                logger.error(newErr);
                return reject(newErr);
              }
              resolve(newBody);
            });
          } else {
            logger.error("Failed to extract cookie from HTML");
            return reject(new Error("Failed to extract cookie from HTML"));
          }
        } else {
          resolve(body);
        }
      });
    });
  };

  static async getVideoDetail(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let url = `https://www.1bt0.com/prod/core/system/getVideoDetail/${id}`;
        // 请求选项
        const options = {
          ...movieController.newOptions,
          url: url,
        };
        const body = await movieController.fetchWithCookie(url, options);
        // logger.info(":qqqqqqqqqqq:::::::::::::", body);
        let ecca = JSON.parse(body).data.ecca;
        resolve({ ecca: ecca, summary: JSON.parse(body).data.summary });
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  }

  async getMovieIndex(req, res, next) {
    try {
      let { page } = req.query;
      // 确保 URL 被正确编码
      let encodedPage = encodeURIComponent(page);
      let url = `https://www.1bt0.com/prod/core/system/getVideoMovieList?sa=1&sb=&sc=&sct=&scn=0&sd=&sdt=&sdn=&se=&set=&sen=&sf=&sft=&sfn=&sg=1&sh=&sht=&shn=0&page=${encodedPage}`;
      if (req.route.path == "/getTvseriesIndex") {
        url = `https://www.1bt0.com/prod/core/system/getVideoMovieList?sa=2&sb=&sc=&sct=&scn=0&sd=&sdt=&sdn=&se=&set=&sen=&sf=&sft=&sfn=&sg=1&sh=&sht=&shn=0&page=${encodedPage}`;
      }
      // 请求选项
      const options = {
        ...movieController.newOptions,
        url: url,
      };

      const body = await movieController.fetchWithCookie(url, options);
      let arrData = JSON.parse(body).data.list;
      for (let i = 0; i < arrData.length; i++) {
        let { id, title, eqxd, epic, edbf, diqu, niandai } = arrData[i];
        let Movie_arr = await Movie.find({ id: id });
        if (Movie_arr.length === 0) {
          if (id) {
            let detail_arr = await movieController.getVideoDetail(id);
            Movie.create({
              id,
              title,
              eqxd,
              pica: epic,
              doubanfen: edbf,
              diqu,
              niandai,
              dynamicData: detail_arr.ecca,
              summary: detail_arr.summary,
              isTvseries: req.route.path == "/getTvseriesIndex" ? true : false,
            });
          } else {
            logger.info("数据已存在", id, title);
          }
        }
      }
      res.send({
        data: {
          list: arrData,
          total: JSON.parse(body).data.total,
        },
        result: 1,
        msg: "success",
      });
    } catch (error) {
      logger.error(error);
      res.send({
        data: error,
        result: 0,
        msg: "fail",
      });
    }
  }

  async getMovieList_carete() {}

  searchMovie = async (req, res, next) => {
    try {
      let { page, keyword } = req.query;

      // 确保 URL 被正确编码
      let encodedKeyword = encodeURIComponent(keyword);
      let encodedPage = encodeURIComponent(page);
      let url = `https://www.1bt0.com/prod/core/system/getVideoList?sb=${encodedKeyword}&page=${encodedPage}`;

      // 请求选项
      const options = {
        ...movieController.newOptions,
        url: url,
      };

      const body = await movieController.fetchWithCookie(url, options);

      // logger.info(url, "ddddddd", movieController.newOptions);
      let arrData = JSON.parse(body).data;
      for (let i = 0; i < arrData.length; i++) {
        let { id, title, eqxd, pica, doubanfen, diqu, niandai } = arrData[i];
        let Movie_arr = await Movie.find({ id: id });
        if (Movie_arr.length === 0) {
          if (id) {
            let detail_arr = await movieController.getVideoDetail(id);
            Movie.create({
              id,
              title,
              eqxd,
              pica,
              doubanfen,
              diqu,
              niandai,
              dynamicData: detail_arr.ecca,
              summary: detail_arr.summary,
            });
          }
        } else {
          logger.info("数据已存在", id, title);
        }
      }
      res.send({
        data: body,
        result: 1,
        msg: "success",
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
}

module.exports = new movieController();
