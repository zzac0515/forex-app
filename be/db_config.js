const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // adjust this based on your app needs
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected successfully");
    connection.release();
    console.log("DB connection released back to pool");
  }
});

module.exports = pool.promise();
