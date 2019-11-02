import { loadPropertyListings } from './init';

export const getListings = (context, route, done) => {
	route = route || {};
    context.executeAction(loadPropertyListings, {}, done);
};