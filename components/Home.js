// Components
import React, { PropTypes } from 'react';

// Stores
import PropertyListingsStore from '../stores/ListingsStore';

// Configs

// Utils
import connectToStores from 'fluxible-addons-react/connectToStores';

export class Home extends React.PureComponent {
    componentDidMount() {
        console.log('hello world', this.props);
    }
    render() {
    	const { properties } = this.props;
    	console.log('in render...', this.props);
    	return (
	        <div>
	            <h2>Home</h2>
	            <p>Welcome to the Valentina's listings!</p>
	        </div>
	    );
    };
};

// Home.propTypes = {
// 	properties: PropTypes..isRequired
// };

export default connectToStores(Home,
    [PropertyListingsStore],
    (context) => {

        const listingsStore = context.getStore('PropertyListingsStore');

        return {
            properties: listingsStore.getPropertyListings()
        }
    }
);
