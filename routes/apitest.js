var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/test', function (req, res, next) {
  // res.redirect("yanzm.html");
  // res.send('奥地利');
  var apath = '/nodecenli/public/images/1.jpg';
  
  fs.readFile(apath, 'binary', function (err, file) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("输出文件");
      //res.writeHead(200,  {'Content-Type':'image/jpeg'});
      res.writeHead(200,  {'Content-Type':'image/jpeg'}); 
      res.write(file, 'binary');
      res.end();
    }
  });
});



module.exports = router;