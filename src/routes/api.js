const app = module.exports = require('express')();
const config = require('../../config').blablaConfig;

const { doRequest, getUriFromObj } = require('../utils');
const { getAggregatedTrips } = require('../actions').trips;


app.post('/trips', (req, res) => {
    const query = {...config.defaultQueryOptions, ...req.body};
    const uri = `${config.apiUri}&${getUriFromObj(query)}`;

    doRequest({
        uri,
        json: true,
    })
    .then(async (response) => {
        const { trips } = response;

        const directTrips = trips.filter((el) => el.departure_place.city_name == query.fn)
        const notDirectTrips = trips.filter(el => !directTrips.includes(el));
        const aggregatedNotDirectTrips = await getAggregatedTrips(notDirectTrips, query.fn);

        const allTrips = directTrips.concat(aggregatedNotDirectTrips);

        res.send(allTrips);
    });
});