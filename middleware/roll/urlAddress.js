const app = {
  Appid: "poiofbouunjydgtk",
  App_secret: "0adupCrFAKiwdzsDbSBBU9xATdR2Y8aG",
};
var m_url = function (url, obj = false) {
  let str = `${url}?app_id=${app.Appid}&app_secret=${app.App_secret}`;
  if (obj) {
    for (let key in obj) {
      str += `&${key}=${obj[key]}`
    }
  }
  return str;
};
module.exports = m_url;
