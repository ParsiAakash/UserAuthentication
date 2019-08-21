import config from './config';

// options for mysql database connections
const mysqlOptions = config.mysql;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: mysqlOptions.host,
  port: mysqlOptions.port,
  user: mysqlOptions.username,
  password: mysqlOptions.password,
  database: mysqlOptions.database,
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
