// Components
import React, { PropTypes } from 'react';

// Stores
import PropertyListingsStore from '../stores/ListingsStore';

// Configs

// Utils
import connectToStores from 'fluxible-addons-react/connectToStores';

export class Home extends React.PureComponent {
    render() {
    	const { properties } = this.props;
    	console.log(properties);
    	return (
	        <div>
	            <h2 className="Bgc(green)">Home</h2>
	            <p>Welcome to the Valentina's listings!</p>
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
