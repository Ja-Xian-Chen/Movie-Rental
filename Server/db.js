const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "sakila",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = db;
