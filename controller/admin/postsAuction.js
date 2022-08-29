// const AdminModel = require('../../models/admin/admin');
// const dtime = require('time-formater');
// const getIdmethod = require('../../prototype/ids');
var multer = require("multer");
var upload = multer();
const fs = require("fs");
var postsAuction = async (req, res, next) => {
  res.send({
    status: 1,
    data: '1',
    session: req.session
  })

}

module.exports = postsAuction


