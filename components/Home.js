// Components
import React, { PropTypes } from 'react';

// Stores
import PropertyListingsStore from '../stores/ListingsStore';
import GeolocationStore from '../stores/GeolocationStore';

// Actions
import { getCurrentPosition } from '../actions/geolocation';

// Utils
import connectToStores from 'fluxible-addons-react/connectToStores';

export class Home extends React.PureComponent {
    componentDidMount () {
        this.context.executeAction(getCurrentPosition);
    }

    render() {
    	const { properties } = this.props;
    	console.log(this.props);
    	return (
	        <div>
	            <h2 className="Bgc(green)">Home</h2>
	            <p>Welcome to the Valentina's listings!</p>
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
