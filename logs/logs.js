var log4js = require('log4js')
//json格式
log4js.addLayout('json', function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator
  }
});
log4js.configure({
  replaceConsole: true,
  appenders: {
    cheese: {
      // 设置类型为 dateFile
      type: 'dateFile',
      // 配置文件名为 myLog.log
      filename: 'logs/myLog.log',
      // 指定编码格式为 utf-8
      encoding: 'utf-8',
      // 配置 layout，此处使用自定义模式 pattern
      layout: {
        type: "pattern",
        // 配置模式，下面会有介绍
        // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
        pattern: '%d %p %m'
      },
      // 日志文件按日期（天）切割
      pattern: "-yyyy-MM-dd",
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true,
    },
  },
  categories: {
    // 设置默认的 categories
    default: { appenders: ['cheese'], level: 'debug' },
  }
})
var logger = log4js.getLogger('服务器访问日志')
exports.logger = logger;
// exports.use = function (app) {
//   app.use(log4js.connectLogger(logger, { level: 'info', format: ':method:url' }))
// }