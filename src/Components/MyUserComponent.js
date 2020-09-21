import React from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import MyRepositoryComponent from "./MyRepositoryComponent";

const USER = gql`
  query($number_of_repos: Int!, $user_name: String!) {
    user(login: $user_name) {
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
  if (window.location.pathname == "/") {
    window.location.pathname = "/kaline";
  }

  const { loading, error, data } = useQuery(USER, {
    variables: {
      number_of_repos: 100,
      user_name: window.location.pathname.substring(1),
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (data) {
    const { user } = data;
    const elements = user.repositories.nodes;

    const items = [];

    for (const [index, value] of elements.entries()) {
      items.push(
        <MyRepositoryComponent
          repositoryURL={value.url}
          name={value.name}
          repositorydescr={value.description}
          language={value.primaryLanguage?.name ?? "No language"}
        />
      );
    }

    return (
      <div>
        <section id="profileData">
          <Avatar id="profileImage" src={user.avatarUrl}>
            K
          </Avatar>
          <h1>
            <a href={user.url}>{user.login}</a>
          </h1>
          <p>{user.name}</p>
          <p>{user.bio}</p>
          <p>{user.company}</p>
          <p>{user.location}</p>
          <p>@{user.twitterUsername}</p>
          <p>{user.email}</p>
        </section>

        <div className="rowC">{items}</div>
      </div>
    );
  }
};

export default MyUserComponent;
