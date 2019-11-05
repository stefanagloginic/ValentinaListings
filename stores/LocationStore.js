import BaseStore from 'fluxible/addons/BaseStore';

class LocationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            location: {}
        };
    }

    loadLocation(payload = {}) {
        const state = this.state;
        const { location } = payload;

        if (location) {
            this.state = {
                ...state,
                location
            };

            this.emitChange();
        }
    }

    getLocation() {
        return this.state.location;
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

LocationStore.storeName = 'LocationStore';
LocationStore.handlers = {
    'LOAD_LOCATION_SUCCESS': 'loadLocation'
};

export default LocationStore;
