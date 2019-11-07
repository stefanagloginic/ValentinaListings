import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import 'babel-polyfill';

// Components
import Application from './components/Application';

// Stores
import ApplicationStore from './stores/ApplicationStore';
import PropertyListingsStore from './stores/ListingsStore';
import LocationStore from './stores/LocationStore';
import GeolocationStore from './stores/GeolocationStore';
import RouteStore from './stores/RouteStore';

const fetchrInstance = fetchrPlugin();
// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrInstance);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(PropertyListingsStore);
app.registerStore(LocationStore);
app.registerStore(GeolocationStore);

module.exports = app;
