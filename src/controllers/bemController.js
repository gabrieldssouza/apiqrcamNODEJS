const bemModel = require('../models/bemModel');
const QRCode = require('qrcode');

exports.criarBem = async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body);
        console.log('Arquivo recebido:', req.file);

        const { nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, etiqueta } = req.body; 
        const foto = req.file ? req.file.filename : null;

        if (!nome || !codigo || !numero || !estado_conservacao || !local_idLocais || !categoria_idCategoria) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
        }

        const fotoUrl = foto ? `${req.protocol}://${req.get('host')}/uploads/${foto}` : null;

        const idbem = await bemModel.criarBem(nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, etiqueta, fotoUrl);

        console.log('URL da foto:', fotoUrl);

        let newData = {
            idbem,
            nome,
            numero,
            codigo,
            estado_conservacao,
            valor_aquisicao,
            data_aquisicao,
            categoria_idCategoria,
            local_idLocais,
            etiqueta,
            fotoUrl
        };

        const qrcode = await QRCode.toDataURL(JSON.stringify(newData));

        await bemModel.atualizarQrCode(idbem, qrcode);

        res.status(201).json({ message: 'Bem criado com sucesso', bem: newData });
    } catch (error) {
        console.error('Erro ao criar bem:', error);
        res.status(500).json({ error: 'Erro ao criar bem' });
    }
};

exports.listarBens = async (req, res) => {
    try {
        const bens = await bemModel.listarBens();
        res.status(200).json(bens);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.adcionarBemLevantamento = async (req,res) => {
    const {bem_idbem, Levantamento_idLevantamento} = req.body;
    try {
        const bem = await bemModel.adcionarBemLevantamento(bem_idbem, Levantamento_idLevantamento);
        res.status(200).send(bem);
    } catch (erro) {
        console.error('Erro no controlador:', erro);
        res.status(500).send('Erro ao adicionar bem ao levantamento');
    }
}
exports.adcionarLevantamento = async (req,res) => {
    const {idLevantamento, data_hora, responsavel, ano} = req.body;
    try {
        const bem = await bemModel.adcionarLevantamento(idLevantamento, data_hora, responsavel, ano);
        res.status(200).send(bem);
    } catch (erro) {
        console.error('Erro no controlador:', erro);
        res.status(500).send('Erro ao adicionar levantamento');
    }
}

exports.listarBensLevantamento = async (req, res) => {
    try {
        const bensLevantamento = await bemModel.listarBensLevantamento();
        res.status(200).json(bensLevantamento);
    } catch (erro) {
        res.status(500).send(erro);
    }
}
exports.listarLevantamento = async (req, res) => {
    try {
        const Levantamento = await bemModel.listarLevantamento();
        res.status(200).json(Levantamento);
    } catch (erro) {
        res.status(500).send(erro);
    }
}


exports.listarBem = async (req, res) => {
    try {
        const { idbem } = req.params;
        const bem = await bemModel.listarBem(idbem);
        res.status(200).json(bem);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.editarBem = async (req, res) => {
    try {
        const { idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, responsavelMovimento, local } = req.body;
        console.log("novo id local: "+local_idLocais+" responsavel: "+responsavelMovimento);
        const resultado = await bemModel.editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, responsavelMovimento, local);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await bemModel.listarCategorias();
        res.status(200).json(categorias);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarLocais = async (req, res) => {
    try{
        const locais = await bemModel.listarLocais();
        res.status(200).json(locais);
    } catch (erro) {
        res.status(500).send(erro);
        console.log(erro)
    }
}

exports.listarLocal = async (req, res) => {
    try {
        const { idLocal } = req.params;
        console.log('ID Local recebido:', idLocal); // Verifique o valor de idLocal
        const listarLocais = await bemModel.listarLocais(idLocal);
        res.status(200).json(listarLocais);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.criarLocal = async (req, res) => {
    try {
        const { nome } = req.body;
        const local = await bemModel.criarlocal(nome);
        res.status(201).json(local);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.missingTag = (req, res) => {
   
    const { id_bem_atual, id_bem_antigo } = req.body;
    console.log("controler missing", id_bem_atual, id_bem_antigo)
    
  
    // Chama o modelo para atualizar o bem atual e excluir o bem antigo
    bemModel.missingTag(id_bem_atual, id_bem_antigo, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o bem:', err);
        return res.status(500).send('Erro ao atualizar o bem');
      }
  
      // Retorna a resposta ao cliente
      res.status(200).send('Bem atualizado e bem antigo excluído com sucesso!');
    });
      };

exports.listarBensDeCategoria = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const BensDeCategoria = await bemModel.listarBensDeCategoria(idCategoria);
        res.status(200).json(BensDeCategoria);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBensDeLocal = async (req, res) => {
    try {
        const { idLocal } = req.params;
        console.log('ID Local recebido:', idLocal); // Verifique o valor de idLocal
        const listarBensDeLocais = await bemModel.listarBensDeLocais(idLocal);
        res.status(200).json(listarBensDeLocais);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBemDeEstado = async (req, res) => {
    try {
        const { nameEstado } = req.params;
        const BensDeEstado = await bemModel.listarBemDeEstado(nameEstado);
        res.status(200).json(BensDeEstado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}