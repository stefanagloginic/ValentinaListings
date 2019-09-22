import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import { obtainBaseApiUrl } from './ATTOM/configs/';

const fetchrInstance = fetchrPlugin({
    xhrPath: obtainBaseApiUrl() // Path for XHR to be served from
});

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrInstance);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

module.exports = app;
