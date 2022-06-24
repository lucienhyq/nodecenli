'use strict';

const mongoose = require('mongoose');
const chalk = require('chalk');
// mongoose.connect("mongodb://127.0.0.1:27017/qq", {useMongoClient:true});
// mongoose.Promise = global.Promise;

const db = mongoose.createConnection("mongodb://127.0.0.1:27017/elm");

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect("mongodb://localhost:27017/qq", {server:{auto_reconnect:true}});
});

module.exports = db
