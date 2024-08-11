import mysql from "mysql";

/*************************************
    Establish connection to MySQL
**************************************/
export const mySqlConnection = function (queryAttr) {
  try {
    const prodSql = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      multipleStatements: true
    });
    return new Promise(async resolve => {
      prodSql.connect(err => {
        if (err) throw err;
      })
      prodSql.execute(queryAttr, async function (err, response) {
        if (err) {
          resolve("Error getting result from DB: ", err)
        } else {
          if (response) {
            resolve(response)
          } else {
            resolve(false)
          }
        }
      });
      prodSql.end();
    })
  } catch (e) {
    console.log("MySQL Error: ", e)
  }
}