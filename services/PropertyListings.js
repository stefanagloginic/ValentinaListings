import superagent from 'superagent';
import querystring from 'querystring';
import { config, obtainPropertyBaseApiUrl } from '../API/BRIDGE/configs/';
import { routes } from '../API/BRIDGE/routes.js';

export const PropertyListingsService = {
    name: 'listings',
    // at least one of the CRUD methods is required
    read: function(req, resource, params = {}, configuration, callback) {
        const { API_STAGE_KEY } = config;
        const { listings } = routes;

        const { postalCode } = params;
        const paramsObj = { postalCode };

        const baseUrl = obtainPropertyBaseApiUrl();
        const param = querystring.stringify(paramsObj); // TODO: include as filter

        const url = `${baseUrl}${listings}`;

        superagent
            .get(url)
            .query({ access_token: API_STAGE_KEY })
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