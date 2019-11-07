/*global describe, it, beforeEach, afterEach */
import {expect} from 'chai';
import {createMockActionContext} from 'fluxible/utils';
import sinon from 'sinon';
import {noop} from '../../lib/utils';

// Actions
let actionsGeolocation;


// Helpers
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

const createMockNavigator = (options) => {
    options = options || {};

    const hasGeolocation = !!options.geolocation || options.hasGeolocation || false;

    const navigator = {
        userAgent: options.userAgent || 'node.js'
    };

    if (hasGeolocation) {
        navigator['geolocation'] = options.geolocation || {
            getCurrentPosition: (successCallback, errCallback) => {
                successCallback({coords: {latitude: 10, longitude: 20}});
            }
        }
    }

    return navigator;
} 

describe('geolocation actions', function () {
    after(function () {
        global.navigator = undefined;
    });

    describe('doGeoCheck', function () {
        it('does geo check', function (done = noop) {
            global.navigator = createMockNavigator({hasGeolocation: true});
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext({});
            const payload = {};
            actionsGeolocation.doGeoCheck(context, payload, function (err, coords) {
                expect(err).to.not.be.ok;
                expect(coords.latitude).to.equal(10)
                expect(coords.longitude).to.equal(20);
                done();
            });
        });
        it('handles geolocation not supported', function() {
            global.navigator = undefined;
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext({});
            const payload = {};
            actionsGeolocation.doGeoCheck(context, payload, function (err) {
                expect(err.code).to.equal('geolocation');
            });
        });
        it('handles permission denied/generic gelocation error', function () {
            global.navigator = createMockNavigator({
                geolocation: {
                    getCurrentPosition: (successCallback, errCallback) => {
                        errCallback({
                            PERMISSION_DENIED: true
                        });
                    }
                }
            });
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.doGeoCheck(context, payload, function (err) {
                expect(err.code).to.equal('not-allowed-geolocation');
            });

            global.navigator = createMockNavigator({
                geolocation: {
                    getCurrentPosition: (successCallback, errCallback) => {
                        errCallback({});
                    }
                }
            });
            actionsGeolocation = requireUncached('../../../actions/geolocation');
            actionsGeolocation.doGeoCheck(context, payload, function (err) {
                expect(err.code).to.equal('geolocation');
            });
        });

        it('handles gelocation result', function() {
            global.navigator = createMockNavigator({hasGeolocation: true});
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.doGeoCheck(context, payload, function(err, result) {
                expect(result).to.deep.equal({
                    latitude: 10,
                    longitude:20
                })
            });
        });
    });
    describe('getCurrentUserLocation', function() {
        it('gets current user location', function(done = noop) {
            global.navigator = createMockNavigator({hasGeolocation: true});
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.getCurrentUserLocation(context, payload, function(err, coords) {
                expect(coords.latitude).to.not.equal(undefined);
                expect(coords.longitude).to.not.equal(undefined);
                done();
            });
        });

        it('handles error', function() {
            global.navigator = createMockNavigator({
                geolocation: {
                    getCurrentPosition: (successCallback, errCallback) => {
                        errCallback({
                            err: 'err'
                        });
                    }
                }
            });
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.getCurrentUserLocation(context, payload, function(err) {
                expect(err.err).to.equal('err');
            });
        });
    });
    describe('getCoordinates', function() {
        it('gets coordinates', function(done = noop) {
            global.navigator = createMockNavigator({hasGeolocation: true});
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.getCoordinates(context, payload, function(err, coords) {
                expect(coords.latitude).to.not.equal(undefined);
                expect(coords.longitude).to.not.equal(undefined);
                done();
            });
        });
        it('handles errors', function() {
            global.navigator = createMockNavigator({
                geolocation: {
                    getCurrentPosition: (successCallback, errCallback) => {
                        errCallback({
                            err: 'err'
                        });
                    }
                }
            });
            actionsGeolocation = requireUncached('../../../actions/geolocation');

            const context = createMockActionContext();
            const payload = {};
            actionsGeolocation.getCoordinates(context, payload, function(err, result) {
                expect(err.err).to.equal('err');
            });
        });
    });
});