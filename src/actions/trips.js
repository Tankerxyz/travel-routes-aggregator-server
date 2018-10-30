const config = require('../../config').blablaConfig;

const { doRequest, getTripQuery, getDatesForAggregatedTripQuery } = require("../utils");
const moment = require('moment');

getAggregatedTrips = async (trips, fromCity) => {
    const resArr = [];

    for (let i = 0; i < trips.length; ++i) {
        const trip = trips[i];
        const options = {
            locale: config.defaultQueryOptions.locale,
            fn: fromCity,
            tn: trip.departure_place.city_name,
        };

        const uriForDuration = getTripQuery({...options, limit: 1});
        const resForDuration = await doRequest({ uri: uriForDuration, json: true });

        const { db, de, hb, he } = getDatesForAggregatedTripQuery(trip, resForDuration.duration);
        const uriForDirectRoute = getTripQuery({
            ...options,
            limit: 100,
            radius: 5,
            db,
            hb,
            de,
            he,
        }); 
        const resForDirect = await doRequest({ uri: uriForDirectRoute, json: true });

        if (resForDirect.trips.length) {
            // todo get first route-to-route path temporary, in the future need aggregate all route-to-route paths
            resArr.push([resForDirect.trips[0], trip]);
        } else {
            resArr.push(trip);
        }
    }

    return resArr;
};

module.exports = {
    getAggregatedTrips,
};