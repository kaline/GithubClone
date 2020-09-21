import React from 'react';
import MyUserComponent from './Components/MyUserComponent';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import App from './App';

let token = "a23bdfde3a6ef2c1ab5d82d3a6af230e6177c17c"

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <MyUserComponent />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

