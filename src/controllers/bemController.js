const bemModel = require('../models/bemModel');

exports.criarBem = async (req, res) => {
    try {
        const {nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria} = req.body;
        const resultado = await bemModel.criarBem(nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBens = async (req, res) => {
    try {
        const bens = await bemModel.listarBens();
        res.status(200).json(bens);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.editarBem = async (req, res) => {
    try {
        const { idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria } = req.body;
        const resultado = await bemModel.editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}