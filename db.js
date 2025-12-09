// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',     // pon tu password si usas uno
  database: 'vaquita',
  waitForConnections: true,
  connectionLimit: 10
});
module.exports = pool;
