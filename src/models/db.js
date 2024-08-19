const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql.infocimol.com.br',
    user: 'infocimol07',
    password: 'qrcam123',
    database: 'infocimol07',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

module.exports = db;
