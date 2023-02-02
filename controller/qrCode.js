const QRCode = require('qrcode');
const fs = require("fs");

const qrCode = async (req, res, next) => {
  try {
    let uid = req.session.user.uid;
    let imgpath = `./uploads/code/card_id_${uid}.png`;
    let ispath = req.protocol + "://" + req.get('host')
    await fs.readdir('./uploads/code', (err, data) => {
      let truePath = `card_id_${uid}.png`;
      data.forEach(element => {
        if (truePath == element) {
          res.send({
            result: 1,
            data: {
              img: `${ispath}/uploads/code/${element}`
            },
            msg: '',
          })
        }
      });
    })
    let base64;
    await QRCode.toDataURL('http://localhost:82/')
      .then(url => {
        let base64_URL = url;
        base64 = base64_URL.replace(/^data:image\/\w+;base64,/, "");
      })
      .catch(err => {
        console.log(err, 'wwwwwwwwwwwwww')
        res.send({
          result: 0,
          data: '',
          msg: err,
        })
      })
    await fs.writeFile(imgpath, base64, 'base64', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('写入成功');
      }
    });
  } catch (error) {

  }

}
module.exports = qrCode;