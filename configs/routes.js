import Home from '../components/Home';
import About from '../components/About';
import { getListings } from '../actions/routeActions';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: Home,
        action: getListings
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: About
    }
};
