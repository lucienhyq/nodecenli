// const mysql = require("mysql");
// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "123456",
//   database: "express",
// });
// function createTableIfNotExists(tableName, createTableSql) {
//   db.query(
//     `CREATE TABLE IF NOT EXISTS \`${tableName}\` ${createTableSql}`,
//     (error, results, fields) => {
//       if (error) {
//         console.error("创建表时发生错误:", error);
//       } else {
//         console.log("表已创建或已存在:", tableName);
//       }
//     }
//   );
// }
// module.exports = { db, createTableIfNotExists };

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "123456",
      database: "express",
    },
    // migrations: {
    //   directory: './migrations',
    // },
    // seeds: {
    //   directory: './seeds',
    // },
  },

  production: {
    // 生产环境配置
  },
};
