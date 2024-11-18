const app = require('../src/api');

app.use((req, res, next) => {
    next();
});

app.listen(21048, () => {
    console.log('Servidor online');
});