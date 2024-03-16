import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });

  return forward(operation);
});

const link = authLink.concat(httpLink);

const graphqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default graphqlClient;
