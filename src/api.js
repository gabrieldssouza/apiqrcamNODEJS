const express = require('express');
const db = require('./models/db');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    res.status(200).send('API online');
}));

app.use('/registrar', router.post('/registrar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.registrar(req, res);
}));

module.exports = app;

