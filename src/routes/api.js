const app = module.exports = require('express')();
const config = require('../../config').blablaConfig;

const { doRequest, getUriFromObj } = require('../utils');
const { getAggregatedTrips } = require('../actions').trips;


app.post('/trips', (req, res) => {
    const { tripQuery, tripUri } = req;

    doRequest({
        uri: tripUri,
        json: true,
    })
    .then(async (response) => {
        const { trips } = response;

        const directTrips = trips.filter((el) => el.departure_place.city_name == tripQuery.fn)
        const notDirectTrips = trips.filter(el => !directTrips.includes(el));
        const aggregatedNotDirectTrips = [] || await getAggregatedTrips(notDirectTrips, tripQuery.fn);

        const allTrips = directTrips.concat(aggregatedNotDirectTrips);

        res.send(trips);
    });
});