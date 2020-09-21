import React from 'react';
import MyUserComponent from './Components/MyUserComponent';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';

let token = "44c05b1983f8713b18970b8aaa8aa70e6efbe3c7"

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

