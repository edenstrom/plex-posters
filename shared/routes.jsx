import React from 'react';
import { Route, Redirect } from 'react-router';

import App from 'components/index';
import Section from 'components/Section';
import About from 'components/About';
import Dashboard from 'components/Dashboard';

export default (
  <Route name="app" component={App} path="/">
    <Route component={About} path="about" />
    <Route component={Dashboard} path="dashboard">
      <Route component={Section} path="/section/:id" />
    </Route>
  </Route>
);
