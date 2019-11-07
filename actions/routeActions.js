// Actions
import { loadPropertyListings, getCoordinates } from './init';

// Utils
import { executeMultiple } from 'fluxible-action-utils/async';

// Stores
import LocationStore from '../stores/LocationStore';

export const getListings = (context, route, done) => {
    route = route || {};

    const actions = {
    	loadLocation: {
            action: getCoordinates
    	},
    	loadListings: [
    		'loadLocation',
    		(context, payload, done) => {
    			const location = context.getStore(LocationStore).getLocation();
    			context.executeAction(loadPropertyListings, { location }, done);
    		}
    	]
    };

    executeMultiple(context, actions, (err, result) => {
    	if (err) {
    		if (err.loadLocation) {
    			context.dispatch('LOAD_LOCATION_FAILURE', err.loadLocation);
    		} else if (err.loadListings) {
    			context.dispatch('LOAD_LISTINGS_FAILURE', err.loadListings);
    		}
    	}

    	done();
    });
};
