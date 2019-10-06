/* globals describe,it */
'use strict';

import component from '../../../components/About';
import {shallow} from 'enzyme';
import React from 'react';
import {expect} from 'chai';
import {createMockComponentContext} from 'fluxible/utils';

describe('About component tests', function () {
    const context = createMockComponentContext({
        stores: []
    });

    it('render', function () {
        const wrapper = shallow(React.createElement(component, {}), {context: context});
        expect(wrapper).to.not.be.ok;
    });
});
