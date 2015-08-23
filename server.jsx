import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swig from 'swig';
import http from 'http';
import path from 'path';
import PlexAPI from './server/PlexAPI';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './shared/routes';
import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import config from './config';

var app = express(),
    server = http.createServer(app);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/shared/views'));
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.use(bodyParser.json());

var plex = new PlexAPI({
  host: config.host,
  port: config.port,
  cacheDir: __dirname
});

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.redirect('/dashboard');
});

app.use((req, res, next) => {
  if (req.path.substr(1, 3) === 'api') {
    return next();
  }

  const location = new Location(req.path, req.query);
  const reducer = combineReducers(reducers);
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  Router.run(routes, location, (err, routeState) => {
    if (err) { return console.error(err); }
    var renderView = function(response) {
      const InitialView = (
        <Provider store={store}>
            {() => <Router {...routeState} /> }
        </Provider>
      );

      const initialState = store.getState();

      const componentHTML = React.renderToString(InitialView);

      // componentHTML = '';
      // initialState = '';

      response.render('index', {
        html: componentHTML,
        initialState
      });
   };

    if (routeState) {
      fetchComponentData(store.dispatch, routeState.components, routeState.params)
        .then(function() {
          renderView(res);
        });
    } else { return next(); }
  });
});

app.get('/api/v1/media/:id', (req, res) => {
  plex.episodes(req.params.id).then(function(result) {
    res.send(result.data._children);
  });
});

app.get('/api/v1/library/metadata/:id/thumb/:media', (req, res) => {
  plex.thumbnail(req.params.id, req.params.media).then(function(result) {
    res.set('Content-Type', 'image/jpeg');

    result.pipe(res);
  });
});

app.get('/api/v1/sections', (req, res) => {
  plex.sections().then(function(result) {
    res.send(result);
  });
});

app.get('/api/v1/posters/:id', (req, res) => {
  plex.posters(req.params.id).then(function(result) {
    res.send(result);
  });
});

app.put('/api/v1/posters/:id', (req, res) => {
  console.log(req.params.id, req.body);

  plex.setPoster(req.params.id, req.body.poster).then(function(result) {
    res.send(result);
  });

});

// app.get('/', (req, res) => {

//
//   res.type('html').send(HTML);
// });

export default app;
