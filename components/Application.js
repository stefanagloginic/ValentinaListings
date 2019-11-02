// Components
import React from 'react';
import Nav from './Nav';

// Stores
import ApplicationStore from '../stores/ApplicationStore';

// Configs
import pages from '../configs/routes';

// Utils
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';

class Application extends React.Component {
    render() {
        var Handler = this.props.currentRoute.handler;

        return (
            <div>
                <Nav currentRoute={this.props.currentRoute} links={pages} />
                <Handler />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
