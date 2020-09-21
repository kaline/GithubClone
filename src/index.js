import React from 'react';
import MyUserComponent from './Components/MyUserComponent';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';

let token = "5744f8fa012b4cfbf392bf7ef96761cb5e83c14b"

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

