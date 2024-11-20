const app = require('../src/api');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

app.use((req, res, next) => {
    next();
});

app.listen(21032, () => {
    console.log('Servidor online');
});

https.createServer({
    cert: fs.readFileSync(path.join('./bin/cert.pem')),
    key: fs.readFileSync(path.join('./bin/key.pem'))
}, app).listen(443, () => console.log("Rodando em HTTPS"));
