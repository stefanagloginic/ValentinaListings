import superagent from 'superagent';
import querystring from 'querystring';
import { config, obtainLocationApiUrl } from '../API/IP/configs/';
import { routes } from '../API/IP/routes.js';

export const GeoLocationService = {
    name: 'geolocation',
    // at least one of the CRUD methods is required
    read: function(req, resource, params = {}, configuration, callback) {
        const baseUrl = obtainLocationApiUrl();
        const { API_ACCESS_KEY } = config;
        const { ipAndCoordinates } = routes;

        const url = `${baseUrl}${ipAndCoordinates}`;

        superagent
            .get(url)
            .query({ access_key: API_ACCESS_KEY })
            .then((res) => {
                let location;

                if (res.ok) {
                    location = JSON.parse(JSON.stringify(res.text));
                }

                callback(null, location);
            }).catch((err) => {
                if (err) {
                    console.log('err',err);
                }
            });
    }
};
