import superagent from 'superagent';
import querystring from 'querystring';
import { config, obtainPropertyBaseApiUrl } from '../ATTOM/configs/';
import { routes } from '../ATTOM/routes.js';

module.exports = {
    name: 'listings',
    // at least one of the CRUD methods is required
    read: function(req, resource, params, configuration, callback) {
        const { API_STAGE_KEY } = config; // TODO: check env? not working
        const { zipCode } = routes;

        const paramsObj = {
            postalcode: '90034' // TODO: HARDCODED NEED TO CHANGE TO LOCAL
        };
        const baseUrl = obtainPropertyBaseApiUrl();
        const param = querystring.stringify(paramsObj)

        const url = `${baseUrl}${zipCode}?${param}`;

        superagent
        .get(url)
        .set({ apikey: API_STAGE_KEY, Accept: 'application/json' })
        .then((res) => {
            if (res.ok) {
                const listings = JSON.parse(JSON.stringify(res.text));

                callback(null, listings);
            }

            callback(null, {});
        }).catch((err) => {
            if (err) {
                console.log('err',err);
            }
        });
    }
    // update: function(resource, params, body, config, callback) {},
    // delete: function(resource, params, config, callback) {}
};