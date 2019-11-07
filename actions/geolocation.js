/*global navigator */
'use strict';

import { noop } from '../lib/utils'

const hasNavigator = typeof navigator !== 'undefined';
const geolocationIsSupported = hasNavigator ? ('geolocation' in navigator) : false;
const PRE_ATTEMPT = 'GEOLOCATION_LOAD_PRE_ATTEMPT';
const FAILURE = 'GEOLOCATION_LOAD_FAILURE';

export function getCoordinates (context, payload, callback) {
    callback = callback || noop;
    navigator.geolocation.getCurrentPosition(position => {
        callback(null, (position || {}).coords);
    }, (err) => {
        context.dispatch(FAILURE, err);
        callback(err);
    });
}

export function getCurrentUserLocation (context, payload, callback) {
    callback = callback || noop;
    context.dispatch(PRE_ATTEMPT);
    getCoordinates(context, payload, function (err, coordinates) {
        if (err) {
            return callback(err);
        }

        coordinates = coordinates || {};
        const {latitude, longitude} = coordinates;
        callback(null, {latitude, longitude});
    });
}
export function doGeoCheck (context, payload, callback) {
    callback = callback || noop;

    if (!geolocationIsSupported) {
        return callback({code: 'geolocation'});
    }

    getCurrentUserLocation(context, {}, function (error, result) {
        if (error) {
            if (error.PERMISSION_DENIED) {
                // Shows an error message telling the user they need to allow geolocation
                return callback({code: 'not-allowed-geolocation'});
            } else {
                // Shows an error message telling the user there was a generic geolocation error
                return callback({code: 'geolocation'});
            }
        }

        callback(null, result);
    });
}

export function getCurrentPosition (context, payload, callback) {
    const ATTEMPT = 'GEOLOCATION_ATTEMPT';
    const SUCCESS = 'GEOLOCATION_SUCCESS';
    const FAILURE = 'GEOLOCATION_FAILURE';

    callback = callback || noop;
    context.dispatch(ATTEMPT);

    context.executeAction(doGeoCheck, doGeoCheck, function (err, result) {
        result = result || {};
        
        if (err) {
            context.dispatch(FAILURE, err);
            return callback(err);
        }

        const {latitude, longitude} = result;
        context.dispatch(SUCCESS, {coords: {latitude, longitude}});
        callback();
    })
}
