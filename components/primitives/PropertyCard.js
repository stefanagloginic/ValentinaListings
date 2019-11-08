// Components
import React, { PropTypes } from 'react';

// Selectors
import {
	getListPrice,
	getBedroomsTotal,
	getBathroomsTotal
} from '../../selectors/properties';

export default class PropertyCard extends React.PureComponent {
    render() {
    	const { property } = this.props;

    	return (
	        <div>
	        	I am the card
	        </div>
	    );
    }
};
