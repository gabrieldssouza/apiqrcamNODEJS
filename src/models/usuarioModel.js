const db = require('./db');

async function registrarUsuario(nome, email, telefone, senha) {
    const values = [nome, email, telefone, senha];
    const sql = `INSERT INTO usuario (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar usuário');
            } else {
                console.log('Usuário registrado com sucesso');
                resolve('Usuário registrado com sucesso');
            }
        });
    });
}

module.exports = { registrarUsuario };