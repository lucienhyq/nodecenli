const express = require("express");
const morgan = require("morgan");
const path = require("path");
const moment = require("moment");
const fs = require("fs-extra"); // fs-extra 提供了一些额外的便利方法
const ueser = require("./router/ueser");
const app = express();
const bodypaeser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodypaeser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodypaeser.json({ limit: '5mb' }));
// 确保log目录存在
const logDirectory = path.join(__dirname, "log");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// 根据当前日期创建日志文件路径
const logFilePath = path.join(
  logDirectory,
  `access-${moment().format("YYYY-MM-DD")}.log`
);
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

// 自定义Morgan格式
const customFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.query),
    JSON.stringify(req.body),
  ].join(" ");
};

// 使用自定义格式和日志流
app.use(morgan(customFormat, { stream: accessLogStream }));

// 引入但不直接使用scheduler，因为它在被引入时自动执行
require("./scheduler");
app.use("/api", ueser);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
