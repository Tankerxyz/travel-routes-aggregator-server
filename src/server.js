const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const request = require("request-promise-native");
const queryString = require('querystring');
const moment = require("moment");

const config = require('../config').server;

const routes = require('./routes');

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(routes);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))