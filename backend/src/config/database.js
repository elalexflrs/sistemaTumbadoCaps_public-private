const mysql = require('mysql2/promise');


const db = mysql.createPool({
  host: 'hopper.proxy.rlwy.net',
  port: 47897,
  user: 'root',
  password: 'eMpzLHowylKujrIHJAuIjXUZMYkRgXoX',
  database: 'railway'
});
module.exports = db;
