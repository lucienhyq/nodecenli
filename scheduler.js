const fs = require('fs');
const path = require('path');
const moment = require('moment');
const cron = require('node-cron');

// 日志清理任务
function rotateLogs() {
  const logDir = path.join(__dirname, 'log');
  fs.readdirSync(logDir).forEach(file => {
    if (file.startsWith('access-') && file.endsWith('.log')) {
      const filePath = path.join(logDir, file);
      const fileDate = moment(file.split('-')[1].split('.')[0], 'YYYY-MM-DD');
      const threeDaysAgo = moment().subtract(3, 'days');
      if (fileDate.isBefore(threeDaysAgo)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old log file: ${filePath}`);
      }
    }
  });
}

// 设置定时任务，每天凌晨执行日志清理
cron.schedule('0 0 * * *', () => {
  console.log('Running log rotation task...');
  rotateLogs();
});

module.exports = cron; // 导出cron实例，虽然在这个场景下可能不需要导出，但留着以备不时之需