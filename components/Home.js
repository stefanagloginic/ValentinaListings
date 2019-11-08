// Components
import React, { PropTypes } from 'react';

// Stores
import PropertyListingsStore from '../stores/ListingsStore';
import GeolocationStore from '../stores/GeolocationStore';

// Actions
import { getCurrentPosition } from '../actions/geolocation';

// Utils
import connectToStores from 'fluxible-addons-react/connectToStores';

// Components
import PropertyCard from './primitives/PropertyCard';

// Selectors
import { getListingKey } from '../selectors/properties';

export class Home extends React.PureComponent {
    componentDidMount () {
        this.context.executeAction(getCurrentPosition);
    }

    render() {
    	const { properties } = this.props;

    	return (
	        <div>
                <PropertyCard />
	        </div>
	    );
    };
};

Home.contextTypes = {
    executeAction: PropTypes.func
};

export default connectToStores(Home,
    [GeolocationStore, PropertyListingsStore],
    (context) => {
        const listingsStore = context.getStore(PropertyListingsStore);
        const geolocationStore = context.getStore(GeolocationStore);

        return {
            properties: listingsStore.getPropertyListings(),
            coords: geolocationStore.getCoords(),
            hasCoords: geolocationStore.hasCoords(),
            permissionDenied: geolocationStore.permissionDenied()
        }
    }
);
