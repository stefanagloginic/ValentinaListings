import superagent from 'superagent';
import querystring from 'querystring';
import { config, obtainPropertyBaseApiUrl } from '../ATTOM/configs/';
import { routes } from '../ATTOM/routes.js';

export const PropertyListingsService = {
    name: 'listings',
    // at least one of the CRUD methods is required
    read: function(req, resource, params = {}, configuration, callback) {
        const { API_STAGE_KEY } = config;
        const { zipCode } = routes;

        const { postalCode } = params;
        const paramsObj = { postalCode };

        const baseUrl = obtainPropertyBaseApiUrl();
        const param = querystring.stringify(paramsObj);

        const url = `${baseUrl}${zipCode}?${param}`;
        superagent
            .get(url)
            .set({ apikey: API_STAGE_KEY, Accept: 'application/json' })
            .then((res) => {
                let listings;
                if (res.ok) {
                    listings = JSON.parse(JSON.stringify(res.text));
                }

                callback(null, listings);
            }).catch((err) => {
                if (err) {
                    console.log('err',err);
                }
            });
    }
};