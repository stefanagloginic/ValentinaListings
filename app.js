import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import { obtainPropertyBaseApiUrl } from './ATTOM/configs/';

// Components
import Application from './components/Application';

// Stores
import ApplicationStore from './stores/ApplicationStore';
import PropertyListingsStore from './stores/ListingsStore';
import RouteStore from './stores/RouteStore';

// Utils
import { provideContext } from 'fluxible-addons-react';

const fetchrInstance = fetchrPlugin({
    xhrPath: obtainPropertyBaseApiUrl() // Path for XHR to be served from
});

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrInstance);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(PropertyListingsStore);

module.exports = app;
