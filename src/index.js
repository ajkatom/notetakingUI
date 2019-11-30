import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink, ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { onError } from 'apollo-link-error';
import Notification, { notify } from 'react-notify-toast';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ massage }) => {
      let msg = massage;
      return notify.show(msg, 'error');
    });
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4300/graphql',
  // fetchOptions: {
  //   mode: 'no-cors',
  // },
});
const link = ApolloLink.from([httpLink]);
const client = new ApolloClient({
  errorLink,
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Notification />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
