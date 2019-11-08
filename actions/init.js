// Selectors
import { getLatitude, getLongitude } from '../selectors/geolocation';

const TIMEOUT = 20000;

export const loadPropertyListings = (context, param, done) => {
    param = param || {};
    // TODO: params has hardcoded zipcode, need to change
    const { location } = param;
    context.service.read('listings',
        { postalCode: '90034' },
        (err, data) => {
            if (err) {
                return done(err);
            }
            context.dispatch('LOAD_LISTINGS_SUCCESS', { listings: data });

            done();
        }
    )
};

export const getCoordinates = (context, param, done) => {
    context.service.read('geolocation', {}, (err, data) => {
        if (err) {
            return done(err);
        }

        const latitude = getLatitude(data);
        const longitude = getLongitude(data);
        context.dispatch('LOAD_LOCATION_SUCCESS', {location: {latitude, longitude}});

        done();
    });
};
