const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'dew2you.',
    database: 'companyDB'
})

module.exports = db