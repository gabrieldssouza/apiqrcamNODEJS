const db = require('./db');

async function criarBem(nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria) {
    const bemValues = [nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria];
    const bemSql = `INSERT INTO bem (nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar bem');
            }

            console.log('Bem cadastrado com sucesso');
            resolve('Bem cadastrado com sucesso');
        });
    });
}

async function listarBens() {
    const bemSql = `SELECT * FROM bem`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bens');
            }

            resolve(results);
        });
    });
}

async function editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria) {
    const bemValues = [nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, idbem];
    const bemSql = `UPDATE bem SET nome = ?, codigo = ?, numero = ?, estado_conservacao = ?, valor_aquisicao = ?, data_aquisicao = ?, categoria_idCategoria = ? WHERE idbem = ?`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao editar bem');
            }

            console.log('Bem editado com sucesso');
            resolve('Bem editado com sucesso');
        });
    });
}

module.exports = { criarBem, listarBens, editarBem };