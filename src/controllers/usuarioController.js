const usuarioModel = require('../models/usuarioModel');

exports.registrar = async (req, res) => {
    try {
        const {nome, sobrenome, telefone, email, senha} = req.body;
        const resultado = await usuarioModel.registrarUsuario(nome, sobrenome, telefone, email, senha);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}