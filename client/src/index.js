import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './containers/App';

import { client } from './configureApolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router basename='/'>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
