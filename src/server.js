const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apicache = require('apicache');
const morgan = require('morgan');

const request = require("request-promise-native");
const queryString = require('querystring');
const moment = require("moment");

const { blablaConfig, server: serverConfig } = require('../config');

const routes = require('./routes');

const { getTripQuery } = require('./utils');

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.use(apicache.middleware('5 minutes'));

app.use('/api/trips', (req, res, next) => {
    const query = {...blablaConfig.defaultQueryOptions, ...req.body};
    const uri = getTripQuery(query);
    req.tripUri = uri;
    req.tripQuery = query;

    next();
});

app.use(express.static('public'));

app.use(routes);

app.listen(serverConfig.port, () => console.log(`Example app listening on port ${serverConfig.port}!`))