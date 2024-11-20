const db = require('./db');

async function criarBem(nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, qrcode, fotoUrl, etiqueta) {
    const bemValues = [nome, codigo, numero, data_aquisicao, valor_aquisicao, estado_conservacao, categoria_idCategoria, local_idLocais, qrcode, fotoUrl, etiqueta];
    const bemSql = 'INSERT INTO bem (nome, numero, codigo, data_aquisicao, valor_aquisicao, estado_conservacao, categoria_idCategoria, local_idLocais, qrcode, foto, etiqueta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar bem');
                return;
            }

            console.log('Bem cadastrado com sucesso');
            resolve(results.insertId);
        });
    });
}

const missingTag = (id_bem_atual, id_bem_antigo, callback) => {
    console.log("modal missing", id_bem_atual, id_bem_antigo)
    const query = `
        UPDATE bem
    SET estado_conservacao = (SELECT estado_conservacao FROM bem WHERE idbem = ?)
    WHERE idbem = ?;
    `;
  
    db.query(query, [id_bem_antigo, id_bem_atual], (err, result) => {
      if (err) {
        return callback(err);
      }
      // Exclui o bem antigo após atualizar o bem atual
      
      const deleteHasQuery = "DELETE FROM bem_has_levantamento WHERE bem_idbem = ?;"
      db.query(deleteHasQuery, [id_bem_antigo], (deleteErr, deleteResult) => {
        if (deleteErr) {
          return callback(deleteErr);
        }
        callback(null, deleteResult);
      });
      
      const deleteQuery = 'DELETE FROM bem WHERE idbem = ?';

      db.query(deleteQuery, [id_bem_antigo], (deleteErr, deleteResult) => {
        if (deleteErr) {
          return callback(deleteErr);
        }
        callback(null, deleteResult);
      });
    });
  };
async function listarBens() {
    const bemSql = `
        SELECT bem.*, local.nome AS local_nome
        FROM bem
        JOIN local ON bem.local_idLocais = local.idLocais
        `;

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

async function listarLocais() {
    const bemSql = 'SELECT * FROM local';
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if(err) {
                console.log(err);
                reject('Erro ao listar locais');
            }
            resolve(results);
        })
    });
}

async function criarlocal(nome, responsavel){
    const bemSql = 'INSERT INTO local (nome, filial_idFilial, pessoa_idpessoa, responsavel) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(bemSql, [nome, 6, 9, responsavel], (err, results) => {
            if(err) {
                console.log(err);
                reject('Erro ao criar local');
            }
            resolve(results);
        })
    });
}

async function listarCategorias(){
    const bemSql = 'SELECT * FROM categoria';

    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao pegar categorias');
            }
            resolve(results);
        });
    });
}

async function listarBensNoTag(){
    const bemSql = 'SELECT * FROM bem where etiqueta = false';

    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao pegar categorias');
            }
            resolve(results);
        });
    });
}

async function listarBensDeCategoria(idCategoria) {
    const bemSql = 'SELECT * FROM bem WHERE categoria_idCategoria = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idCategoria], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem de Categoria');
            }
            resolve(results);
        });
    });
}

async function listarBensDeLocais(idlocal) {
    const bemSql = 'SELECT * FROM bem WHERE local_idLocais = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idlocal], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem de local');
            }
            resolve(results);
        });
    });
}
async function listarIDLocais(idlocal) {
    const bemSql = 'SELECT * from local WHERE idLocais = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idlocal], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem de local');
            }
            resolve(results[0]);
        });
    });
}


async function listarBemDeEstado(nameEstado) {
    const bemSql = 'SELECT * FROM bem WHERE estado_conservacao = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [nameEstado], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao pegar bens bem');
            }
            resolve(results);

        });
    });
}

async function editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais) {
    const bemValues = [nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, idbem];
    const bemSql = 'UPDATE bem SET nome = ?, codigo = ?, numero = ?, estado_conservacao = ?, valor_aquisicao = ?, data_aquisicao = ?, categoria_idCategoria = ?, local_idLocais = ? WHERE idbem = ?';
    console.log("dados do edit:" + bemValues);
    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao editar bem');
                return;
            }

            console.log('Bem editado com sucesso');

        });
    });
}


async function listarBem(idbem) {
    const bemSql = 'SELECT * FROM bem WHERE idbem = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idbem], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem');
            }

            resolve(results[0]);
        });
    });
}

async function atualizarQrCode(idbem, qrcode) {
    const bemSql = 'UPDATE bem SET qrcode = ? WHERE idbem = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [qrcode, idbem], (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao atualizar QR code');
                return;
            }

            console.log('QR code atualizado com sucesso');
            resolve();
        });
    });
}
async function adcionarBemLevantamento(bem_idbem, Levantamento_idLevantamento) {
    const values = [bem_idbem, Levantamento_idLevantamento];
    const bemSql = `
        INSERT INTO bem_has_levantamento (bem_idbem, Levantamento_idLevantamento)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE Levantamento_idLevantamento = VALUES(Levantamento_idLevantamento);
    `;
    return new Promise((resolve, reject) => {
        db.query(bemSql, values, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar bem levantamento');
                return;
            }
            console.log('Levantamento cadastrado ou atualizado com sucesso');
            resolve(results);
        });
    });
}

async function adcionarLevantamento(data_hora, responsavel, ano) {
    const values = [ data_hora, responsavel, ano];
    const bemSql = 'INSERT INTO levantamento (data_hora, responsavel, ano) VALUES ( ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(bemSql, values, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar levantamento');
                return;
                
            }
            console.log('cadastrar levantamento feito com sucesso ');
            resolve(results);
        });
    });
}
async function listarLevantamento() {
    const bemSql = 'SELECT * FROM levantamento';
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar levantamentos');
            }
            resolve(results);
        });
    });
}
async function listarBensLevantamento() {
    const bemSql = 'SELECT * FROM bem_has_levantamento';
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bens de levantamento');
            }
            resolve(results);
        });
    });
}

async function buscarPorNome(nome) {
    const bemSql = 'SELECT * FROM bem WHERE nome LIKE ?';
    const nomePesquisa = `%${nome}%`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, [nomePesquisa], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao buscar bens');
            }
            resolve(results);
        });
    });
}

module.exports = { criarBem, listarBens, editarBem, listarBem, atualizarQrCode, listarBemDeEstado, listarBensDeLocais, listarBensDeCategoria, listarCategorias, criarlocal, listarLocais, adcionarBemLevantamento, 
    listarBensLevantamento, adcionarLevantamento, listarLevantamento,
    missingTag, listarIDLocais,  listarBensDeLocais, listarBensNoTag, buscarPorNome};