const db = require('./db');

async function registrarUsuario(email, senha) {
    const values = [email, senha];
    const sql = `INSERT INTO usuario (email, senha, pessoa_idpessoa) VALUES (?, ?, 1)`;

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