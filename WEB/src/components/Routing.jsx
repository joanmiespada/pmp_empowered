import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Layout, Panel } from 'react-toolbox';
import App from './App';
import Login from './login';

const LoginWrapper = () => (
  <Layout>
    <Panel>
      <Login showme={false} />
    </Panel>
  </Layout>
);


const Routing = () => (
  <Router>
    <Route path="/" component={App} />
    <Route path="login" component={LoginWrapper} />
  </Router>
);

export default Routing;
