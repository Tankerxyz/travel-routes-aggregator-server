const app = module.exports = require('express')();

app.get('/', function(req, res) {
    res.send(`only for api server`);
});

app.use('/api', require('./api'));

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'not found' });
});
