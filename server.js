/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import Fetcher from 'fetchr';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import { PropertyListingsService } from './services/PropertyListings';

const env = process.env.NODE_ENV;
const debug = debugLib('valentinalistings');
const server = express();

server.use('/public', express['static'](path.join(__dirname, '/build')));
server.use(compression());
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
let fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(PropertyListingsService);

// Set up the fetchr middleware

server.use(fetchrPlugin.getXhrPath(), Fetcher.middleware());

server.use((req, res, next) => {
    const context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    const fetcher = new Fetcher({
        xhrPath: fetchrPlugin.getXhrPath(), // xhrPath will be ignored on the serverside fetcher instantiation
        req: req
    });

    fetcher
        .read('listings')
        .params()
        .end((err, data, meta) => {
            if (err) {
                console.log(err);
            } else {
                // TODO: handling..data could come back as undefined if api req unsuccessful
                console.log(data);
            }
        });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // Pass through to next middleware
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        const htmlElement = React.createElement(HtmlComponent, {
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
