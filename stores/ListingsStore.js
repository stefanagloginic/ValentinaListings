import BaseStore from 'fluxible/addons/BaseStore';

class PropertyListingsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            properties: {}
        };
    }

    loadListings(payload = {}) {
        const state = this.state;
        const { listings } = payload;

        if (listings) {
            this.state = {
                ...state,
                properties: listings
            };

            this.emitChange();
        }
    }

    getPropertyListings() {
        return this.state.properties;
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

PropertyListingsStore.storeName = 'PropertyListingsStore';
PropertyListingsStore.handlers = {
    'LOAD_LISTINGS_SUCCESS': 'loadListings'
};

export default PropertyListingsStore;
