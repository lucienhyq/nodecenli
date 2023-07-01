//报错文件
var createError = require('http-errors');
const express = require('express');
const path = require('path');
//cookie处理模块
const cookieParser = require("cookie-parser");
//引入session模块
const session = require("express-session");
// jwt插件
const { expressjwt } = require("express-jwt");
const secretKey = require('./js/jwt');
//引入路由
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const orderRouter = require("./routes/order");
const viadanteRouter = require("./routes/viadante");
const testRouter = require("./routes/apitest");
const cors = require("cors");
// var blog = require("./routes/blog");
// var blogConten = require("./routes/blogConten");
// const errHandler = require("./middleware/error-handler");


var app = express();
//引入解析post参数的模块
var bodypaeser = require("body-parser");
app.use(cors());
app.use(bodypaeser.urlencoded({ limit:'5mb',extended: false }));
app.use(bodypaeser.json({limit:'5mb'}));
app.use(
  session({
    name: "referrs",
    secret: "referrs",
    cookie: {
      maxAge: 86400000, //一天后过期
    },
    resave: false, //每次请求是否重新设置session
    //	指每次请求重新设置 session cookie ,假如你设置的 cookie有效 10分钟
    saveUninitialized: false, //每次请求是否初始化session
  })
);

app.use(cookieParser());
//匹配静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
// token验证
app.use(
  expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: ['/login','/qrCode', '/register', '/checkLoginUser', '/uploads','/outLogin', '/posts', '/wxtoken', '/wxMiniLogin', "/firstHome", { url: /^\/apitest\/.*/, methods: ['GET', 'POST'] }],
  })
);

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
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": err || 'Unknown Request',
  })
});

module.exports = app;
