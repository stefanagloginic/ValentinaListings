import { loadPropertyListings } from './init';

export const getListings = (context, route = {}, done) => {
    context.executeAction(loadPropertyListings, {}, done);
};