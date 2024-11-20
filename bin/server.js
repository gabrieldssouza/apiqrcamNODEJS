const app = require('../src/api');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

app.use((req, res, next) => {
    next();
});

app.listen(3000, () => {
    console.log('Servidor online');
});
