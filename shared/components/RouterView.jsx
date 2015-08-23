import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { Provider }        from 'react-redux';
import { fromJS }          from 'immutable';
import * as reducers       from 'reducers';
import promiseMiddleware   from 'lib/promiseMiddleware';
import immutifyState       from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';
import routes from 'routes';

const initialState = immutifyState(window.__INITIAL_STATE__);
const reducer = combineReducers(reducers);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);


export default class RouterView extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router children={routes} history={history} />
        }
      </Provider>
    );
  }
}
