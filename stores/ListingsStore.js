import BaseStore from 'fluxible/addons/BaseStore';

class PropertyListingsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            properties: {}
        };
    }

    loadListings(payload) {
        payload = payload || {};
        const state = this.state;
        const { listings } = payload;

        if (listings) {
            this.state = {
                ...state,
                properties: payload.listings
            };
            console.log('this.state from loadListings (dispatch has happened)', this.state);
            this.state = payload.listings;

            this.emitChange();
        }
    }

    getPropertyListings() {
        console.log('in property listings function from connectToStore..');
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
