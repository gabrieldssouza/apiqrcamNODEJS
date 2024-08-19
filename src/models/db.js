const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql.infocimol.com.br',
    user: 'infocimol07',
    password: 'qrcam123',
    database: 'infocimol07',
    connectTimeout: 10000
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ' + err);
        return;
    }
});

module.exports = db;
