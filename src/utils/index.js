const request = require('request-promise-native');
const config = require('../../config').blablaConfig;
const moment = require('moment');

getUriFromObj = (obj) => {
    const valuedKeys = Object.keys(obj).filter((k) => !!obj[k] && obj[k] != 'null');
    return valuedKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
};

async function doRequest(reqObj) {
    let res;

    for (let i = 0; i < 3; ++i) {
        await new Promise(resolve => setTimeout(() => resolve(), 1500));
        try {
            res = await request(reqObj);
        } catch (e) {
            if (e.statusCode === 429) {
                console.log('======================!!!!429!!!!======================= fucking rate limit');
                continue;
            }
        }
        return res;
    }
    throw new Error('Time is Up');
}

function getDatesForAggregatedTripQuery(trip, duration) {
    const durationHours = ~(duration / 60**2) * -1;
    const dateFormatWithTime = "DD-MM-YYYY HH:mm:ss";
    const dateFormat = "DD-MM-YYYY";

    // get timeStart minus duration time
    let db = moment(trip.departure_date, dateFormatWithTime).subtract({hours: durationHours});
    const hb = db.get('hours');
    db = db.format(dateFormat);

    // get timeEnd formatted date and hours end
    let de = moment(trip.departure_date, dateFormatWithTime);
    const he = de.get('hours');
    de = de.format(dateFormat);

    return {
        db,
        hb,
        de,
        he,
    }
}

function getTripQuery(queryObj) {
    return `${config.apiUri}&${getUriFromObj(queryObj)}`
}

module.exports = {
    getUriFromObj,
    doRequest,
    getTripQuery,
    getDatesForAggregatedTripQuery,
};