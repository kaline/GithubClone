import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import App from '../App';
import { validate } from 'graphql';
import { Card } from '@material-ui/core';
import MyRepositoryComponent from './MyRepositoryComponent'


let token = "a23bdfde3a6ef2c1ab5d82d3a6af230e6177c17c"

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


const USER = gql`

query($number_of_repos:Int!) {
  viewer {
    url
    avatarUrl
    name
    login
    bio
    company
    twitterUsername
    location
    email
    status {
      id
    }
     repositories(last: $number_of_repos) {
       nodes {
         name
         description
         url
         primaryLanguage {
          name
         }
       }
    }
    
    }
}
`;

const MyUserComponent = () => {
  const { loading, error, data } = useQuery(USER, {
    variables: {
      "number_of_repos": 100
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    const { viewer } = data;
    const elements =  viewer.repositories.nodes;

    const items = [];

    for (const [index, value] of elements.entries()) {
      items.push(<MyRepositoryComponent  repositoryURL= {value.url} name={value.name} repositorydescr={value.description}  language ={value.primaryLanguage?.name ?? "No language"}/>);
    }
  
    return (
      <div>
        <section id="profileData">
        <Avatar id="profileImage" src= { viewer.avatarUrl } >K</Avatar>
         <h1><a href={viewer.url}>{ viewer.login}</a></h1>
         <p>{ viewer.name }</p>
         <p>{ viewer.bio }</p>
         <p>{ viewer.company }</p>
         <p>{ viewer.location }</p>
         <p>@{ viewer.twitterUsername }</p>
         <p>{ viewer.email }</p>
        </section>
        

         <div className='rowC'>
         { items }
        </div>
       
          
      </div>
    );
  }
};

export default MyUserComponent;
