// Components
import React, { PropTypes } from 'react';

// Stores
import PropertyListingsStore from '../stores/ListingsStore';

// Utils
import connectToStores from 'fluxible-addons-react/connectToStores';

// Components
import PropertyCard from './primitives/PropertyCard';

// Selectors
import { getListingKey } from '../selectors/properties';

export class Home extends React.PureComponent {
    render() {
    	const { properties } = this.props;

    	return (
	        <div>
                <PropertyCard />
	        </div>
	    );
    };
};

export default connectToStores(Home,
    [PropertyListingsStore],
    (context) => {
        const listingsStore = context.getStore('PropertyListingsStore');

        return {
            properties: listingsStore.getPropertyListings()
        }
    }
);
