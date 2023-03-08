const crypto = require("crypto");
const token = "quan36091355";

const wxindex = async (req, res, next) => {
  let signature = req.query.signature;
  let timestamp = req.query.timestamp;
  let nonce = req.query.nonce;
  let echostr = req.query.echostr;
  let array = new Array(token, timestamp, nonce);
  array.sort();
  let str = array.toString().replace(/,/g, "");
  //2. 将三个参数字符串拼接成一个字符串进行sha1加密
  var sha1Code = crypto.createHash("sha1");
  var code = sha1Code.update(str, "utf-8").digest("hex");

  //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (code === signature) {
    res.send(echostr);
  } else {
    res.send("error");
  }
}

module.exports = wxindex;