const db = require('./db');

async function registrarUsuario(nome, sobrenome, telefone, email, senha) {
    const pessoaValues = [nome, sobrenome, telefone];
    const usuarioValues = [email, senha];
    const pessoaSql = `INSERT INTO pessoa (nome, sobrenome, telefone) VALUES (?, ?, ?)`;
    const usuarioSql = `INSERT INTO usuario (email, senha, pessoa_idPessoa) VALUES (?, ?, LAST_INSERT_ID())`;

    return new Promise((resolve, reject) => {
        db.query(pessoaSql, pessoaValues, (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.log(err);
                    reject('Erro ao cadastrar pessoa');
                });
            }

            const pessoaId = result.insertId;

            db.query(usuarioSql, usuarioValues, (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.log(err);
                        reject('Erro ao cadastrar usuário');
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.log(err);
                            reject('Erro ao confirmar transação');
                        });
                    }

                    console.log('Usuário registrado com sucesso');
                    resolve('Usuário registrado com sucesso');
                });
            });
        });
    });
};

module.exports = { registrarUsuario };