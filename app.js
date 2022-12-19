//报错文件
var createError = require('http-errors');
var logger = require('./logs/logs').logger;
var log = require('./logs/logs');
var express = require('express');
var path = require('path');
//cookie处理模块
var cookieParser = require("cookie-parser");
//引入路由
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var orderRouter = require("./routes/order");
var viadanteRouter = require("./routes/viadante");
var testRouter = require("./routes/apitest");
var blog = require("./routes/blog");
var blogConten = require("./routes/blogConten");
const loginCheck = require("./middleware/checkLogin");

const errHandler = require("./middleware/error-handler");
//引入session模块
var session = require("express-session");

var app = express();
app.use(
  session({
    name: "tianmao",
    secret: "tianmao",
    cookie: {
      maxAge: 80000000000, //
    },
    resave: false, //每次请求是否重新设置session
    //	指每次请求重新设置 session cookie ,假如你设置的 cookie有效 10分钟
    saveUninitialized: false, //每次请求是否初始化session
  })
);

//引入解析post参数的模块
var bodypaeser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//匹配静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))


//引用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', orderRouter);
app.use('/viadante', viadanteRouter);
app.use('/apitest', testRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
