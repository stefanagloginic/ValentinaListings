import BaseStore from 'fluxible/addons/BaseStore';

class GeolocationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            permissionDenied: false,
            hasCoords: false,
            coords: {}
        };
    }

    loadGeolocation(payload = {}) {
        const state = this.state;
        const { coords } = payload;

        if (coords) {
            this.state = {
                ...state,
                hasCoords: true,
                coords
            };

            this.emitChange();
        }
    }

    failedGeolocation (payload = {}) {
        const state = this.state;
        const {code} = payload;
        const permissionDenied = code === 'not-allowed-geolocation';

        this.state = {
            ...state,
            permissionDenied,
            hasCoords: false,
            coords: {}
        };

        this.emitChange();
    }

    getCoords () {
        return this.state.coords;
    }

    hasCoords () {
        return this.state.hasCoords;
    }

    permissionDenied () {
        return this.state.permissionDenied;
    }

    dehydrate() {
        return {
            state: this.state
        };
    }

    rehydrate(payload) {
        this.state = payload.state;
    }
};

GeolocationStore.storeName = 'GeolocationStore';
GeolocationStore.handlers = {
    'GEOLOCATION_SUCCESS': 'loadGeolocation',
    'GEOLOCATION_FAILURE': 'failedGeolocation',
};

export default GeolocationStore;
