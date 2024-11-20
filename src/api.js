const express = require('express');
const cors = require('cors');
const db = require('./models/db');
const app = express();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    res.status(200).send('API online');
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/criarbem', router.post('/criarbem', upload.single('foto'), async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.criarBem(req, res);
}));

app.use('/registrar', router.post('/registrar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.registrar(req, res);
}));

app.use('/logar', router.post('/logar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.logar(req, res);
}));

app.use('/usuarios', router.get('/usuarios', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.listarUsuarios(req, res);
}));

app.use('/listarBens', router.get('/listarBens', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBens(req, res);
}));

app.use('/listarBem/:idbem', router.get('/listarBem/:idbem', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBem(req, res);
}));

app.use('/editarBem', router.put('/editarBem', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.editarBem(req, res);
}));

app.use('/listarCategorias', router.get('/listarCategorias', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarCategorias(req, res);
}));

app.use('/listarCategoria/:idCategoria', router.get('/listarCategoria/:idCategoria', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensDeCategoria(req, res);
}));

app.use('/listarlocais', router.get('/listarlocais', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarLocais(req, res);
}));

app.use('/listarBensNoTag', router.get('/listarBensNoTag', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensNoTag(req, res);
}));

app.use('/listarlocal/:idLocal', router.get('/listarlocal/:idLocal', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensDeLocal(req, res);
}));

app.use('/local/:idLocal', router.get('/local/:idLocal', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarLocal(req, res);
}));

app.use('/criarlocal', router.post('/criarlocal', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.criarLocal(req, res);
}));

app.use('/missingTag', router.put('/missingTag', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.missingTag(req, res);
}))

app.use('/listarEstados/:nameEstado', router.get('/listarEstados/:nameEstado', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBemDeEstado(req, res);
}));

app.use('/addBensLevantamento', router.post('/addBensLevantamento', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.adcionarBemLevantamento(req, res);
}));

app.use('/addLevantamento', router.post('/addLevantamento', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.adcionarLevantamento(req, res);
}));


app.use('/listarBensLevantamento', router.get('/listarBensLevantamento', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensLevantamento(req, res);
}));

app.use('/listarLevantamentos', router.get('/listarLevantamentos', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarLevantamento(req, res);
}));


app.use('/buscarPorNome', router.get('/buscarPorNome', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.buscarPorNome(req, res);
}));


module.exports = app;