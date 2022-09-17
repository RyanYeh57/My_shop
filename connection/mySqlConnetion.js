const mysql = require('mysql');
const config = require('config');

const connection = mysql.createConnection(
  {
    host: config.get("host"), 
    user: config.get("user"), 
    password: config.get("password"),
    database: config.get("database")
  }
);

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;