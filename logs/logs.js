var log4js = require('log4js')
//json格式
log4js.addLayout('json', function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator
  }
});
log4js.configure({
  appenders: {
    type: {
      "type": "console",
      "category": "console"
    },
    out: {
      type: 'file',
      filename: "logs/log/error.log",
      layout: { type: 'json', separator: ',' },
      maxLogSize: 10485760,
      backups: 20,
      compress: true
    }
  },
  categories: {
    default: { appenders: ['out', 'type'], level: 'info' }
  }
})
var logger = log4js.getLogger('服务器访问日志')
exports.logger = logger;
exports.use = function (app) {
  app.use(log4js.connectLogger(logger, { level: 'info', format: ':method:url' }))
}